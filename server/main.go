package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"projects/enyou/server/router"
)

func main() {
	commonRouter := gin.Default()
	commonRouter.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "ok")
	})
	commonRouter.POST("/login", router.Login)
	commonRouter.Run(":8000")
}
