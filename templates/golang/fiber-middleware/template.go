// Package middleware - Created on ${DAY}-${MONTH}-${YEAR} by ${USER}
package middleware

import (
	"strings"

	"github.com/gofiber/fiber/v2"
)

// ${NAME_PASCAL_CASE}Middleware creates a new Fiber middleware for ${NAME_TITLE_CASE}
func ${NAME_PASCAL_CASE}Middleware() fiber.Handler {
	return func(c *fiber.Ctx) error {
		authHeader := c.Get("Authorization")
		if authHeader == "" {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"success": false,
				"message": "Authorization header is missing",
			})
		}

		parts := strings.SplitN(authHeader, " ", 2)
		if len(parts) != 2 || parts[0] != "Bearer" {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"success": false,
				"message": "Invalid authorization token format",
			})
		}

		// Set context variable for downstream handlers
		c.Locals("${NAME_CAMEL_CASE}", parts[1])

		return c.Next()
	}
}
