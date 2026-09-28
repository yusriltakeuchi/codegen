// Package repository - Created on ${DAY}-${MONTH}-${YEAR} by ${USER}
package repository

import (
	"context"
	"database/sql"
	"errors"
)

type ${NAME_PASCAL_CASE}Repository interface {
	GetByID(ctx context.Context, id string) (interface{}, error)
	Create(ctx context.Context, model interface{}) error
	Update(ctx context.Context, id string, model interface{}) error
	Delete(ctx context.Context, id string) error
}

type ${NAME_CAMEL_CASE}Repository struct {
	db *sql.DB
}

func New${NAME_PASCAL_CASE}Repository(db *sql.DB) ${NAME_PASCAL_CASE}Repository {
	return &${NAME_CAMEL_CASE}Repository{
		db: db,
	}
}

func (r *${NAME_CAMEL_CASE}Repository) GetByID(ctx context.Context, id string) (interface{}, error) {
	if id == "" {
		return nil, errors.New("id is required")
	}
	// Query database
	return nil, nil
}

func (r *${NAME_CAMEL_CASE}Repository) Create(ctx context.Context, model interface{}) error {
	// Execute insert query
	return nil
}

func (r *${NAME_CAMEL_CASE}Repository) Update(ctx context.Context, id string, model interface{}) error {
	// Execute update query
	return nil
}

func (r *${NAME_CAMEL_CASE}Repository) Delete(ctx context.Context, id string) error {
	// Execute delete query
	return nil
}
