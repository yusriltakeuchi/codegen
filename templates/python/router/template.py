# Created on ${DAY}-${MONTH}-${YEAR} by ${USER}

from typing import List
from fastapi import APIRouter, HTTPException, status

router = APIRouter(
    prefix="/${NAME_KEBAB_CASE_PLURAL}",
    tags=["${NAME_PASCAL_CASE_PLURAL}"]
)


@router.get("/", response_model=List[dict], status_code=status.HTTP_200_OK)
async def list_${NAME_SNAKE_CASE_PLURAL}():
    """Retrieve a list of ${NAME_HUMAN_CASE_PLURAL}."""
    return []


@router.get("/{${NAME_SNAKE_CASE}_id}", response_model=dict, status_code=status.HTTP_200_OK)
async def get_${NAME_SNAKE_CASE}(${NAME_SNAKE_CASE}_id: str):
    """Retrieve a single ${NAME_HUMAN_CASE} by ID."""
    if not ${NAME_SNAKE_CASE}_id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="${NAME_TITLE_CASE} not found")
    return {"id": ${NAME_SNAKE_CASE}_id, "name": "${NAME_TITLE_CASE}"}


@router.post("/", response_model=dict, status_code=status.HTTP_201_CREATED)
async def create_${NAME_SNAKE_CASE}(payload: dict):
    """Create a new ${NAME_HUMAN_CASE}."""
    return {"id": "1", **payload}


@router.put("/{${NAME_SNAKE_CASE}_id}", response_model=dict, status_code=status.HTTP_200_OK)
async def update_${NAME_SNAKE_CASE}(${NAME_SNAKE_CASE}_id: str, payload: dict):
    """Update an existing ${NAME_HUMAN_CASE}."""
    return {"id": ${NAME_SNAKE_CASE}_id, **payload}


@router.delete("/{${NAME_SNAKE_CASE}_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_${NAME_SNAKE_CASE}(${NAME_SNAKE_CASE}_id: str):
    """Delete a ${NAME_HUMAN_CASE}."""
    return None
