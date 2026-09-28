// Package handler - Created on ${DAY}-${MONTH}-${YEAR} by ${USER}
package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type ${NAME_PASCAL_CASE}Handler struct {
	// Inject service dependencies here
	// ${NAME_CAMEL_CASE}Service service.${NAME_PASCAL_CASE}Service
}

func New${NAME_PASCAL_CASE}Handler() *${NAME_PASCAL_CASE}Handler {
	return &${NAME_PASCAL_CASE}Handler{}
}

// RegisterRoutes registers all ${NAME_TITLE_CASE} API routes to the given router group
func (h *${NAME_PASCAL_CASE}Handler) RegisterRoutes(rg *gin.RouterGroup) {
	group := rg.Group("/${NAME_PLURAL_KEBAB_CASE}")
	{
		group.GET("", h.GetAll)
		group.GET("/:id", h.GetByID)
		group.POST("", h.Create)
		group.PUT("/:id", h.Update)
		group.DELETE("/:id", h.Delete)
	}
}

// GetAll handles fetching all ${NAME_PLURAL_TITLE_CASE}
func (h *${NAME_PASCAL_CASE}Handler) GetAll(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    []gin.H{},
	})
}

// GetByID handles fetching a single ${NAME_TITLE_CASE} by ID
func (h *${NAME_PASCAL_CASE}Handler) GetByID(c *gin.Context) {
	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "ID is required",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "${NAME_TITLE_CASE} fetched successfully",
		"data": gin.H{
			"id": id,
		},
	})
}

// Create handles creating a new ${NAME_TITLE_CASE}
func (h *${NAME_PASCAL_CASE}Handler) Create(c *gin.Context) {
	var payload struct {
		Name string `json:"name" binding:"required"`
	}

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Validation failed",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"success": true,
		"message": "${NAME_TITLE_CASE} created successfully",
		"data":    payload,
	})
}

// Update handles updating an existing ${NAME_TITLE_CASE}
func (h *${NAME_PASCAL_CASE}Handler) Update(c *gin.Context) {
	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "ID is required",
		})
		return
	}

	var payload struct {
		Name string `json:"name" binding:"required"`
	}

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Validation failed",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "${NAME_TITLE_CASE} updated successfully",
		"data":    payload,
	})
}

// Delete handles removing a ${NAME_TITLE_CASE} by ID
func (h *${NAME_PASCAL_CASE}Handler) Delete(c *gin.Context) {
	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "ID is required",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "${NAME_TITLE_CASE} deleted successfully",
	})
}
