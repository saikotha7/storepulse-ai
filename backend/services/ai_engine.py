import os
from typing import Dict, Any

class AIEngine:
    def __init__(self, provider: str = "openai", api_key: str = None):
        self.provider = provider
        self.api_key = api_key or os.getenv("OPENAI_API_KEY") or os.getenv("ANTHROPIC_API_KEY")

    async def analyze_review(self, text: str) -> Dict[str, Any]:
        """
        PO Vision: Deep analysis for personalized responses and escalation detection.
        Detects if the issue is too critical for a 'bot' response.
        """
        # Simulated high-fidelity classification logic for the Spectrum use case
        urgency = "NORMAL"
        
        # High-risk keywords that trigger internal store tickets
        critical_keywords = [
            "legal", "sue", "lawsuit", "fraud", "scam", 
            "never coming back", "closing account", "cancel service",
            "lawyer", "police", "billing fraud"
        ]
        
        text_lower = text.lower()
        if any(word in text_lower for word in critical_keywords):
            urgency = "CRITICAL"
        elif any(word in text_lower for word in ["unacceptable", "worst", "ridiculous", "disgusting"]):
            urgency = "HIGH"
            
        category = "General"
        if "bill" in text_lower or "charge" in text_lower:
            category = "Billing"
        elif "wait" in text_lower or "time" in text_lower or "hour" in text_lower:
            category = "Wait Time"
        elif "staff" in text_lower or "rude" in text_lower or "behavior" in text_lower:
            category = "Staff Behavior"
        elif "tech" in text_lower or "internet" in text_lower or "phone" in text_lower:
            category = "Technical Issue"

        # Bot Failure Keywords: Cases where the AI shouldn't even draft a reply
        bot_failure_keywords = [
            "lawyer", "police", "legal", "arbitration", "fraud", "criminal",
            "medical", "health hazard", "emergency", "fire"
        ]
        bot_failed = any(word in text_lower for word in bot_failure_keywords)

        return {
            "sentiment_score": -0.85 if urgency == "CRITICAL" else -0.5,
            "emotion": "Anger" if urgency == "CRITICAL" else "Frustration",
            "category": category,
            "urgency": urgency,
            "bot_failed": bot_failed
        }

    async def generate_reply(self, text: str, category: str, location_name: str = "this location") -> str:
        """
        Generates HUMANIZED, context-aware responses to avoid 'bot frustration'.
        """
        text_lower = text.lower()
        
        if category == "Billing":
            return f"I am truly sorry to hear about the billing discrepancy at the {location_name}. This is not how we want our customers to feel. I've personally flagged this to the regional billing audit team to ensure your account is reviewed immediately. We will make this right."
            
        if category == "Wait Time":
            return f"We sincerely apologize for the long wait you experienced at {location_name}. We know your time is valuable. I'm sharing your feedback with the store manager right now to address the staffing levels during peak hours."
            
        if category == "Staff Behavior":
            return f"This does not reflect our values at {location_name}, and I apologize for the interaction you had. I've alerted the store supervisor so they can address this with the team and provide the necessary coaching."

        return f"Thank you for sharing your feedback about {location_name}. We take your experience seriously. I've shared your comments regarding {category.lower()} with our local management team for immediate review."
