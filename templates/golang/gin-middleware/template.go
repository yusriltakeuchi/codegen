// Package middleware - Created on ${DAY}-${MONTH}-${YEAR} by ${USER}
package middleware

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

// ${NAME_PASCAL_CASE}Middleware provides middleware logic for ${NAME_TITLE_CASE}
func ${NAME_PASCAL_CASE}Middleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Example: Read authorization header or perform pre-request checks
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"success": false,
				"message": "Missing authorization token",
			})
			return
		}

		parts := strings.SplitN(authHeader, " ", 2)
		if len(parts) != 2 || parts[0] != "Bearer" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"success": false,
				"message": "Invalid token format",
			})
			return
		}

		// Store authenticated payload / token in Gin context
		c.Set("${NAME_CAMEL_CASE}", parts[1])

		// Continue processing subsequent handlers
		c.Next()
	}
}
