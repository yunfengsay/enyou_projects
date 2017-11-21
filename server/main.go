package main

import (
	"fmt"
	"projects/enyou/server/conf"
	"projects/enyou/server/db"
	"projects/enyou/server/router"
	"projects/enyou/server/tool"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

func AuthNeedLogin() gin.HandlerFunc {
	return func(c *gin.Context) {
		fmt.Println(tool.Sessions)
		cookie, err := c.Request.Cookie("en_session")
		if err != nil {
			fmt.Println(err)
		}
		if cookie == nil {
			// c.AbortWithStatus(400)
			c.JSON(200, gin.H{"ok": false, "message": "需要登录"})
			return
		}
		fmt.Println("auth need lanjie  ", (tool.Sessions)[cookie.Value])
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
	commonRouter.GET("/articals", router.GetArticals)
	commonRouter.POST("/articals", AuthNeedLogin(), router.AddArtical)
	commonRouter.PUT("/articals", AuthNeedLogin(), router.ModifyArtical)
	commonRouter.DELETE("/articals/:id", AuthNeedLogin(), router.DeleteArtical)
	commonRouter.Run(":" + conf.ConfigContext.ServerPort)
}
