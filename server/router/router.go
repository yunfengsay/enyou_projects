package router

import (
	"fmt"
	"projects/enyou/server/model"

	"github.com/gin-gonic/gin"
)

func Login(c *gin.Context) {
	var json model.UserStruct
	if err := c.ShouldBindJSON(&json); err == nil {
		fmt.Println(json)
	}
}
