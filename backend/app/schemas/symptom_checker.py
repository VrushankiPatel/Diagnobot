from pydantic import BaseModel
from typing import List, Optional

class SymptomCheckerRequest(BaseModel):
    symptomChips: List[str]
    duration: Optional[str]
    onsetDate: Optional[str]
    location: Optional[str]
    urgency: Optional[str]
    riskFactors: Optional[List[str]]
    hadSimilar: Optional[str]
    fileName: Optional[str] = None
    fileUrl: Optional[str] = None