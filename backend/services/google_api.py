import httpx
from typing import List, Dict, Any
import os

class GooglePlacesService:
    def __init__(self, api_key: str = None):
        self.api_key = api_key or os.getenv("GOOGLE_PLACES_API_KEY")
        self.base_url = "https://maps.googleapis.com/maps/api/place"

    async def search_business(self, query: str) -> List[Dict[str, Any]]:
        """
        Search for business locations using Text Search.
        """
        if not self.api_key:
            # Mock data for demonstration if API key is missing
            return [
                {
                    "name": "Spectrum Mobile - Sample Store",
                    "place_id": "mock_place_1",
                    "formatted_address": "123 Main St, New York, NY 10001",
                    "rating": 4.2,
                    "user_ratings_total": 150
                }
            ]
        
        url = f"{self.base_url}/textsearch/json"
        params = {
            "query": query,
            "key": self.api_key
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params)
            data = response.json()
            return data.get("results", [])

    async def get_reviews(self, place_id: str) -> List[Dict[str, Any]]:
        """
        Fetch reviews for a specific place.
        Note: Basic Places API only returns top 5 reviews. 
        For full review history, Google My Business API is usually needed, 
        but we'll start with what Places offers or mock it for MVP.
        """
        if not self.api_key:
            return [
                {
                    "author_name": "John Doe",
                    "rating": 2,
                    "text": "Wait time was way too long. Staff were rude.",
                    "time": 1708600000
                },
                {
                    "author_name": "Jane Smith",
                    "rating": 1,
                    "text": "Billing error and nobody would help me. Worst experience ever.",
                    "time": 1708500000
                }
            ]

        url = f"{self.base_url}/details/json"
        params = {
            "place_id": place_id,
            "fields": "reviews,rating,user_ratings_total",
            "key": self.api_key
        }

        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params)
            data = response.json()
            return data.get("result", {}).get("reviews", [])
