package router

import (
	"github.com/gin-gonic/gin"
)

func Login(c *gin.Context) {
	var json LoginStruct
	if err := c.ShouldBindJSON(&json); err == nil {

	}
}
