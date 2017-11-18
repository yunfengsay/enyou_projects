package router

import (
	"fmt"
	"net/http"
	"projects/enyou/server/model"
	"projects/enyou/server/tool"
	"time"

	"github.com/gin-gonic/gin"
)

func Login(c *gin.Context) {
	var json model.UserStruct
	if err := c.BindJSON(&json); err == nil {
		pwdMd5 := tool.GetMd5(json.Pwd)
		fmt.Println(pwdMd5)
		fmt.Println(json)
		isAuth := model.UserLogin(json.UserName, pwdMd5)
		cookie := tool.GetMd5(pwdMd5 + time.Now().Format("2006-01-02 15:04:05 -0700"))
		fmt.Print(cookie)
		isFindCookie := false
		for k, v := range *tool.Sessions {
			if v == json.UserName {
				delete(*tool.Sessions, k)
				(*tool.Sessions)[cookie] = v
				isFindCookie = true
				break
			}
		}
		if !isFindCookie {
			var newCookie http.Cookie
			newCookie.Name = "en_session"
			newCookie.Value = cookie
			http.SetCookie(c.Writer, &newCookie) // 这里为什么是 & 不是 *
			fmt.Println("set cookie ----> ", newCookie)
		}
		c.JSON(http.StatusOK, gin.H{"ok": isAuth, "message": "登录成功"})
	}
}

func GetArticals(c *gin.Context) {
	return
}
