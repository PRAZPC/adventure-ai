import json
from typing import  List , Optional, Dict
from  datetime import  datetime
from  pydantic import BaseModel


class StoryOptionSchema(BaseModel):
    text:str
    node_id :Optional[int] = None

class StoryNodeBase(BaseModel):
    content : str
    is_ending : bool = False
    is_winning_ending : bool = False

class completestoryNodeResponse(StoryNodeBase):
    id :int
    options : List[StoryOptionSchema] = []

    class Config:
        from_attributes = True

class StoryBase(BaseModel):
    title :str
    session_id :Optional[str] = None
    class Config:
        from_attributes = True

class CreateStoryrequest(BaseModel):
    theme :str

class completestoryresponse(StoryBase):
    id :int
    created_at : datetime
    root_node: completestoryNodeResponse
    all_node : Dict[int,completestoryNodeResponse]
    class Config:
        from_attributes = True