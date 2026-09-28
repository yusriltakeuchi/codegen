// Package handler - Created on ${DAY}-${MONTH}-${YEAR} by ${USER}
package handler

import (
	"github.com/gofiber/fiber/v2"
)

type ${NAME_PASCAL_CASE}Handler struct {
	// Inject service or usecase dependencies here
	// ${NAME_CAMEL_CASE}Service service.${NAME_PASCAL_CASE}Service
}

func New${NAME_PASCAL_CASE}Handler() *${NAME_PASCAL_CASE}Handler {
	return &${NAME_PASCAL_CASE}Handler{}
}

// RegisterRoutes registers all ${NAME_TITLE_CASE} API routes to the Fiber router
func (h *${NAME_PASCAL_CASE}Handler) RegisterRoutes(router fiber.Router) {
	group := router.Group("/${NAME_PLURAL_KEBAB_CASE}")

	group.Get("/", h.GetAll)
	group.Get("/:id", h.GetByID)
	group.Post("/", h.Create)
	group.Put("/:id", h.Update)
	group.Delete("/:id", h.Delete)
}

// GetAll handles fetching all ${NAME_PLURAL_TITLE_CASE}
func (h *${NAME_PASCAL_CASE}Handler) GetAll(c *fiber.Ctx) error {
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"success": true,
		"data":    []fiber.Map{},
	})
}

// GetByID handles fetching a single ${NAME_TITLE_CASE} by ID
func (h *${NAME_PASCAL_CASE}Handler) GetByID(c *fiber.Ctx) error {
	id := c.Params("id")
	if id == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"success": false,
			"message": "ID parameter is required",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"success": true,
		"message": "${NAME_TITLE_CASE} fetched successfully",
		"data": fiber.Map{
			"id": id,
		},
	})
}

// Create handles creating a new ${NAME_TITLE_CASE}
func (h *${NAME_PASCAL_CASE}Handler) Create(c *fiber.Ctx) error {
	var payload struct {
		Name string `json:"name"`
	}

	if err := c.BodyParser(&payload); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"success": false,
			"message": "Invalid request body",
			"error":   err.Error(),
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"success": true,
		"message": "${NAME_TITLE_CASE} created successfully",
		"data":    payload,
	})
}

// Update handles updating an existing ${NAME_TITLE_CASE}
func (h *${NAME_PASCAL_CASE}Handler) Update(c *fiber.Ctx) error {
	id := c.Params("id")
	if id == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"success": false,
			"message": "ID parameter is required",
		})
	}

	var payload struct {
		Name string `json:"name"`
	}

	if err := c.BodyParser(&payload); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"success": false,
			"message": "Invalid request body",
			"error":   err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"success": true,
		"message": "${NAME_TITLE_CASE} updated successfully",
		"data":    payload,
	})
}

// Delete handles removing a ${NAME_TITLE_CASE} by ID
func (h *${NAME_PASCAL_CASE}Handler) Delete(c *fiber.Ctx) error {
	id := c.Params("id")
	if id == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"success": false,
			"message": "ID parameter is required",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"success": true,
		"message": "${NAME_TITLE_CASE} deleted successfully",
	})
}
