from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
import database
import models
import schemas
from services.review_processor import ReviewProcessor

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="StorePulse AI API")

@app.get("/health")
async def health():
    return {"status": "healthy"}

# Dependency
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/businesses/", response_model=schemas.Business)
async def create_business(business: schemas.BusinessCreate, db: Session = Depends(get_db)):
    processor = ReviewProcessor(db)
    return await processor.add_business(name=business.name)

@app.post("/businesses/{business_id}/fetch")
async def fetch_business_data(business_id: int, query: str, db: Session = Depends(get_db)):
    processor = ReviewProcessor(db)
    await processor.fetch_and_process_locations(business_id, query)
    return {"message": "Data fetch and processing completed"}

@app.get("/locations/{business_id}", response_model=list[schemas.Location])
def get_locations(business_id: int, state: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(models.Location).filter(models.Location.business_id == business_id)
    if state:
        query = query.filter(models.Location.state == state)
    return query.all()

@app.get("/states/{business_id}")
def get_states(business_id: int, db: Session = Depends(get_db)):
    states = db.query(models.Location.state).filter(models.Location.business_id == business_id).distinct().all()
    return [s[0] for s in states if s[0]]

@app.get("/reviews/{location_id}", response_model=list[schemas.Review])
def get_reviews(location_id: int, db: Session = Depends(get_db)):
    return db.query(models.Review).filter(models.Review.location_id == location_id).all()

@app.get("/tickets/{business_id}", response_model=list[schemas.Ticket])
def get_tickets(business_id: int, db: Session = Depends(get_db)):
    return db.query(models.Ticket).join(models.Location).filter(models.Location.business_id == business_id).all()

@app.post("/tickets/{ticket_id}/close")
def close_ticket(ticket_id: int, db: Session = Depends(get_db)):
    ticket = db.query(models.Ticket).filter(models.Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    ticket.status = "CLOSED"
    db.commit()
    return {"message": "Ticket closed"}
