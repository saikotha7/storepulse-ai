from sqlalchemy.orm import Session
import models
from services.osm_api import OpenStreetMapService
from services.ai_engine import AIEngine
import datetime

class ReviewProcessor:
    def __init__(self, db: Session):
        self.db = db
        self.location_service = OpenStreetMapService()
        self.ai_engine = AIEngine()

    async def add_business(self, name: str):
        # Check if business already exists
        existing = self.db.query(models.Business).filter(models.Business.name == name).first()
        if existing:
            return existing
            
        business = models.Business(name=name)
        self.db.add(business)
        self.db.commit()
        self.db.refresh(business)
        return business

    async def fetch_and_process_locations(self, business_id: int, query: str):
        # Using OSM for free location search
        locations_data = await self.location_service.search_business(query)
        
        for loc_data in locations_data:
            # Check if location already exists
            existing_loc = self.db.query(models.Location).filter(models.Location.place_id == loc_data["place_id"]).first()
            if existing_loc:
                continue

            location = models.Location(
                business_id=business_id,
                place_id=loc_data["place_id"],
                address=loc_data["formatted_address"],
                state=loc_data.get("state"),
                city=loc_data.get("city"),
                rating=loc_data["rating"],
                review_count=loc_data["user_ratings_total"]
            )
            self.db.add(location)
            self.db.flush() # Get location.id
            
            # Fetch and process reviews
            await self.process_location_reviews(location)
        
        self.db.commit()

    async def process_location_reviews(self, location: models.Location):
        # Using mock reviews as OSM doesn't have review data
        reviews_data = await self.location_service.get_mock_reviews(location.place_id)
        
        for rev_data in reviews_data:
            if rev_data["rating"] <= 3:
                analysis = await self.ai_engine.analyze_review(rev_data["text"])
                
                # Check for critical frustration or bot failure
                status = "PENDING"
                if analysis.get("bot_failed"):
                    status = "BOT_FAILED"
                elif analysis["urgency"] == "CRITICAL":
                    status = "ESCALATED"
                
                review = models.Review(
                    location_id=location.id,
                    review_id=f"{location.place_id}_{rev_data['time']}_{hash(rev_data['author_name'])}",
                    reviewer_name=rev_data["author_name"],
                    rating=rev_data["rating"],
                    text=rev_data["text"],
                    date=datetime.datetime.fromtimestamp(rev_data["time"]),
                    sentiment_score=analysis["sentiment_score"],
                    emotion=analysis["emotion"],
                    category=analysis["category"],
                    urgency_flag=analysis["urgency"],
                    ai_reply=await self.ai_engine.generate_reply(rev_data["text"], analysis["category"], location.address.split(',')[0]),
                    status=status
                )
                self.db.add(review)
                self.db.flush() # Get review.id
                
                # If escalated or bot failed, create a Ticket
                if status in ["ESCALATED", "BOT_FAILED"]:
                    ticket = models.Ticket(
                        review_id=review.id,
                        location_id=location.id,
                        priority="CRITICAL" if status == "BOT_FAILED" else ("HIGH" if analysis["urgency"] == "CRITICAL" else "MEDIUM"),
                        notes=f"AI {'BOT FAILURE' if status == 'BOT_FAILED' else 'ESCALATION'}: {analysis['emotion']} detected regarding {analysis['category']}."
                    )
                    self.db.add(ticket)
