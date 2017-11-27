package main

// 精品原创 文章 工艺法规数据库
import (
	"fmt"
	"net/http"
	"projects/enyou/server/conf"
	"projects/enyou/server/db"
	"projects/enyou/server/router"
	"projects/enyou/server/tool"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

func redirectRes(c *gin.Context) {
	if c.Request.URL.Path == "/" {
		c.Redirect(http.StatusMovedPermanently, "/login")
		c.Abort()
	} else {
		c.JSON(http.StatusOK, gin.H{
			"ok":       false,
			"message":  "需要登录",
			"needAuth": true,
		})
		c.Abort()
	}
	return
}
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		//c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		c.Next()
	}
}
func AuthNeedLogin() gin.HandlerFunc {
	return func(c *gin.Context) {
		cookie, err := c.Request.Cookie("en_session")
		fmt.Println(c.Request.URL)
		if err != nil {
			fmt.Println(err)
		}
		if cookie == nil {
			// c.AbortWithStatus(400)
			fmt.Println("🦐  cookie为空")
			redirectRes(c)
			return
		}
		fmt.Println(cookie.Value, " 👈这是cookie的value")
		if cookie.Value == "" {
			redirectRes(c)
			return
		}
		if _, ok := (tool.Sessions)[cookie.Value]; ok {
			c.Next()
		} else {
			redirectRes(c)
		}
	}
}

func main() {
	conf.ReadConf()
	db.MakeDataBase()
	commonRouter := gin.Default()
	commonRouter.Use(CORSMiddleware())
	// commonRouter.LoadHTMLGlob("static/*.html")
	commonRouter.Static("/static", "static")
	commonRouter.Use(static.Serve("/", static.LocalFile("/static", false)))
	commonRouter.GET("/", AuthNeedLogin(), func(c *gin.Context) {
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
	commonRouter.POST("/changepwd", AuthNeedLogin(), router.ChangePwd)
	commonRouter.Run(":" + conf.ConfigContext.ServerPort)
}
