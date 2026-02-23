import httpx
from typing import List, Dict, Any

class OpenStreetMapService:
    def __init__(self):
        self.base_url = "https://nominatim.openstreetmap.org/search"
        self.headers = {
            "User-Agent": "StorePulseAI/1.0 (contact@storepulse.ai)"
        }

    async def search_business(self, query: str) -> List[Dict[str, Any]]:
        """
        Search for locations using OpenStreetMap Nominatim.
        """
        params = {
            "q": query,
            "format": "json",
            "addressdetails": 1,
            "limit": 50
        }
        
        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(self.base_url, params=params, headers=self.headers)
                data = response.json()
                
                results = []
                for item in data:
                    results.append({
                        "name": item.get("display_name").split(',')[0],
                        "place_id": str(item.get("place_id")),
                        "formatted_address": item.get("display_name"),
                        "city": item.get("address", {}).get("city") or item.get("address", {}).get("town"),
                        "state": item.get("address", {}).get("state"),
                        "rating": 4.0, # OSM doesn't have ratings, we'll default or mock
                        "user_ratings_total": 0
                    })
                return results
            except Exception as e:
                print(f"OSM Search Error: {e}")
                return []

    async def get_mock_reviews(self, place_id: str) -> List[Dict[str, Any]]:
        """
        OSM doesn't have reviews, so we provide high-quality mock data for the MVP.
        In a real scenario, this would come from a specialized scraper or crowdsourced DB.
        """
        return [
            {
                "author_name": "Marcus Aurelius",
                "rating": 1,
                "text": "The wait time at this location is unacceptable. I spent 45 minutes just to be told they couldn't help with my billing issue. Avoid at all costs.",
                "time": 1708600000
            },
            {
                "author_name": "Livia Drusilla",
                "rating": 2,
                "text": "Staff were dismissive when I brought up a technical issue with my device. Very disappointing service compared to other branches.",
                "time": 1708500000
            }
        ]
