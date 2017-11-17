package main

import (
	"net/http"
	"projects/enyou/server/router"

	"github.com/gin-gonic/gin"
)

func AuthNeedLogin() gin.HandlerFunc {
	return func(c *gin.Context) {
		// token := c.Request.Header.Get("cookie")
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
	commonRouter.LoadHTMLGlob("static/*.html")
	commonRouter.Static("/static", "static")
	commonRouter.GET("/login", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", nil)
	})
	commonRouter.POST("/login", router.Login)
	commonRouter.GET("/articals", AuthNeedLogin(), router.GetArticals)
	commonRouter.Run(":8000")
}
