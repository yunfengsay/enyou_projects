package router

import (
	"fmt"
	"projects/enyou/server/model"
	"projects/enyou/server/tool"

	"github.com/gin-gonic/gin"
)

func Login(c *gin.Context) {
	var json model.UserStruct
	if err := c.BindJSON(&json); err == nil {
		pwdMd5 := tool.GetMd5(json.Pwd)
		isAuth := model.UserLogin(json.UserName, pwdMd5)
		fmt.Println(isAuth)
	}
}
