// Package model - Created on ${DAY}-${MONTH}-${YEAR} by ${USER}
package model

import (
	"time"

	"gorm.io/gorm"
)

// ${NAME_PASCAL_CASE} represents the database entity model
type ${NAME_PASCAL_CASE} struct {
	ID        uint           `gorm:"primaryKey;autoIncrement" json:"id"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`

	Name        string `gorm:"type:varchar(255);not null" json:"name"`
	Description string `gorm:"type:text" json:"description,omitempty"`
	IsActive    bool   `gorm:"default:true" json:"is_active"`
}

// TableName specifies the database table name for ${NAME_PASCAL_CASE}
func (${NAME_PASCAL_CASE}) TableName() string {
	return "${NAME_PLURAL_SNAKE_CASE}"
}

// Create${NAME_PASCAL_CASE}Request represents the payload for creating a new ${NAME_TITLE_CASE}
type Create${NAME_PASCAL_CASE}Request struct {
	Name        string `json:"name" binding:"required" validate:"required"`
	Description string `json:"description"`
}

// Update${NAME_PASCAL_CASE}Request represents the payload for updating an existing ${NAME_TITLE_CASE}
type Update${NAME_PASCAL_CASE}Request struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	IsActive    *bool  `json:"is_active"`
}

// ${NAME_PASCAL_CASE}Response represents the API response format for ${NAME_TITLE_CASE}
type ${NAME_PASCAL_CASE}Response struct {
	ID          uint      `json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description,omitempty"`
	IsActive    bool      `json:"is_active"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}
