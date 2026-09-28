// Package service - Created on ${DAY}-${MONTH}-${YEAR} by ${USER}
package service

import (
	"context"
	"errors"
)

type ${NAME_PASCAL_CASE}Service interface {
	FindByID(ctx context.Context, id string) (interface{}, error)
	FindAll(ctx context.Context) ([]interface{}, error)
	Create(ctx context.Context, payload interface{}) (interface{}, error)
	Delete(ctx context.Context, id string) error
}

type ${NAME_CAMEL_CASE}Service struct {
	// Inject repository or third-party client
}

func New${NAME_PASCAL_CASE}Service() ${NAME_PASCAL_CASE}Service {
	return &${NAME_CAMEL_CASE}Service{}
}

func (s *${NAME_CAMEL_CASE}Service) FindByID(ctx context.Context, id string) (interface{}, error) {
	if id == "" {
		return nil, errors.New("id cannot be empty")
	}
	// Business logic
	return nil, nil
}

func (s *${NAME_CAMEL_CASE}Service) FindAll(ctx context.Context) ([]interface{}, error) {
	// Business logic
	return []interface{}{}, nil
}

func (s *${NAME_CAMEL_CASE}Service) Create(ctx context.Context, payload interface{}) (interface{}, error) {
	// Business logic
	return payload, nil
}

func (s *${NAME_CAMEL_CASE}Service) Delete(ctx context.Context, id string) error {
	if id == "" {
		return errors.New("id cannot be empty")
	}
	// Business logic
	return nil
}
