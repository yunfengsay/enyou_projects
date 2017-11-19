package main

import (
	"fmt"
	"projects/enyou/server/conf"
	"projects/enyou/server/db"
	"projects/enyou/server/router"

	"github.com/gin-contrib/static"
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
		token := c.Request.Header.Get("cookie")
		fmt.Println("auth need lanjie  ", token)
		c.Next()
	}
}
func main() {
	conf.ReadConf()
	db.MakeDataBase()
	commonRouter := gin.Default()
	// commonRouter.LoadHTMLGlob("static/*.html")
	commonRouter.Static("/static", "static")
	commonRouter.Use(static.Serve("/", static.LocalFile("/static", false)))
	commonRouter.GET("/", func(c *gin.Context) {
		c.File("./static/index.html")
	})
	commonRouter.GET("/login", func(c *gin.Context) {
		// c.HTML(http.StatusOK, "login.html", nil)
		c.File("./static/login.html")
	})

	commonRouter.POST("/login", router.Login)
	commonRouter.GET("/articals", AuthNeedLogin(), router.GetArticals)
	commonRouter.POST("/articals/add", AuthNeedLogin(), router.AddArtical)
	commonRouter.PUT("/articals/modify", AuthNeedLogin(), router.ModifyArtical)
	commonRouter.DELETE("/articals/:id", AuthNeedLogin(), router.DeleteArtical)
	commonRouter.Run(":" + conf.ConfigContext.ServerPort)
}
