from sqlalchemy import Column, Integer, String, Text, Float, DateTime, ForeignKey, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
import datetime

Base = declarative_base()

class Business(Base):
    __tablename__ = "businesses"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    locations = relationship("Location", back_populates="business")

class Location(Base):
    __tablename__ = "locations"
    id = Column(Integer, primary_key=True, index=True)
    business_id = Column(Integer, ForeignKey("businesses.id"))
    place_id = Column(String, unique=True, index=True)
    address = Column(String)
    city = Column(String, index=True)
    state = Column(String, index=True) # e.g., "Missouri"
    rating = Column(Float)
    review_count = Column(Integer)
    
    business = relationship("Business", back_populates="locations")
    reviews = relationship("Review", back_populates="location")
    tickets = relationship("Ticket", back_populates="location")

class Review(Base):
    __tablename__ = "reviews"
    id = Column(Integer, primary_key=True, index=True)
    location_id = Column(Integer, ForeignKey("locations.id"))
    review_id = Column(String, unique=True, index=True)
    reviewer_name = Column(String)
    rating = Column(Integer)
    text = Column(String)
    date = Column(DateTime)
    sentiment_score = Column(Float)
    emotion = Column(String)
    category = Column(String)
    urgency_flag = Column(String) # "NORMAL", "HIGH", "CRITICAL"
    ai_reply = Column(String)
    status = Column(String, default="PENDING") # "PENDING", "REPLIED", "ESCALATED", "BOT_FAILED"
    
    location = relationship("Location", back_populates="reviews")
    ticket = relationship("Ticket", back_populates="review", uselist=False)

class Ticket(Base):
    __tablename__ = "tickets"
    id = Column(Integer, primary_key=True, index=True)
    review_id = Column(Integer, ForeignKey("reviews.id"))
    location_id = Column(Integer, ForeignKey("locations.id"))
    status = Column(String, default="OPEN") # "OPEN", "IN_PROGRESS", "CLOSED"
    priority = Column(String) # "MEDIUM", "HIGH", "CRITICAL"
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    notes = Column(String, nullable=True)
    
    review = relationship("Review", back_populates="ticket")
    location = relationship("Location", back_populates="tickets")
