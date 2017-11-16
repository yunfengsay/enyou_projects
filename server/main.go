package main

import (
	"net/http"
	"projects/enyou/server/router"

	"github.com/gin-gonic/gin"
)

func AuthNeedLogin() gin.HandlerFunc {
	return func(c *gin.Context) {
		// token := c.Request.Header.Get("token")
		// fmt.Println(token)
		// if token == "" {
		// 	c.AbortWithStatus(400)
		// }
		// id := models.GetUserIdByToken(token)
		// c.Set("userid", id)
		c.Next()
	}
}
func main() {
	commonRouter := gin.Default()
	commonRouter.Use(AuthNeedLogin())
	commonRouter.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "ok")
	})
	commonRouter.POST("/login", router.Login)
	commonRouter.Run(":8000")
}
