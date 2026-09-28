# Created on ${DAY}-${MONTH}-${YEAR} by ${USER}

from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict, Field


class ${NAME_PASCAL_CASE}Base(BaseModel):
    name: str = Field(..., min_length=1, max_length=100, description="${NAME_TITLE_CASE} name")
    description: Optional[str] = Field(None, max_length=255, description="Optional description")


class ${NAME_PASCAL_CASE}Create(${NAME_PASCAL_CASE}Base):
    pass


class ${NAME_PASCAL_CASE}Update(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = None


class ${NAME_PASCAL_CASE}Response(${NAME_PASCAL_CASE}Base):
    id: str
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)
