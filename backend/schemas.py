from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class TicketBase(BaseModel):
    status: str
    priority: str
    notes: Optional[str]

class Ticket(TicketBase):
    id: int
    review_id: int
    location_id: int
    created_at: datetime

    class Config:
        from_attributes = True

class ReviewBase(BaseModel):
    reviewer_name: str
    rating: int
    text: str
    date: datetime
    sentiment_score: Optional[float]
    emotion: Optional[str]
    category: Optional[str]
    urgency_flag: str
    ai_reply: Optional[str]
    status: str

class Review(ReviewBase):
    id: int
    location_id: int
    ticket: Optional[Ticket] = None

    class Config:
        from_attributes = True

class LocationBase(BaseModel):
    place_id: str
    address: str
    city: Optional[str]
    state: Optional[str]
    rating: float
    review_count: int

class Location(LocationBase):
    id: int
    business_id: int
    
    class Config:
        from_attributes = True

class BusinessBase(BaseModel):
    name: str

class BusinessCreate(BusinessBase):
    pass

class Business(BusinessBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
