from typing import List, Dict, Optional, Any
from pydantic import BaseModel,Field


class StoryOptionLLM(BaseModel):
    text: Optional[str] = Field(
        default=None,
        description="Optional text for story"
    )

    nextNode: Optional[Dict[str, Any]] = Field(
        default=None,
        description="The next node"
    )

class StoryNodeLLM(BaseModel):
    content: str = Field(description="the main content of the story node")
    isEnding : bool = Field(description='this is the ending node')
    isWinningEnding : bool = Field(description='winning node or not')
    options : Optional[List[StoryOptionLLM]] = Field(default=None,description='the options for the node')

class StoryLLMResponse(BaseModel):
    title :str = Field(description='the title of the story')
    rootNode :StoryNodeLLM = Field(description='the root node of the story')
