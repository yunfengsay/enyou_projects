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
		for k, v := range tool.Sessions {
			if v == json.UserName {
				delete(tool.Sessions, k)
				(tool.Sessions)[cookie] = v
				fmt.Println("😄 😂 改变 cookie success ", cookie)
				break
			}
		}
		expiration := time.Now().Add(365 * 24 * time.Hour)
		http.SetCookie(c.Writer, &http.Cookie{
			Name:     "en_session",
			Value:    cookie,
			HttpOnly: false,
			Path:     "/",
			Expires:  expiration,
		})
		(tool.Sessions)[cookie] = json.UserName
		fmt.Println("😄 😂 写入 cookie success ", cookie)

		// c.JSON(http.StatusOK, gin.H{"ok": isAuth, "message": "登录成功"})
		if isAuth {
			c.JSON(http.StatusOK, gin.H{"ok": isAuth, "message": "登录成功"})
			// c.Redirect(http.StatusMovedPermanently, "/")
		} else {
			c.JSON(http.StatusOK, gin.H{"ok": isAuth, "message": "用户名或密码错误"})
		}
	}
}

func GetArticals(c *gin.Context) {
	articals, err := model.GetAllArtical()
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusOK, gin.H{
			"ok":      false,
			"message": err,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"ok":   true,
		"data": articals,
	})
}

func AddArtical(c *gin.Context) {
	var artical model.Artical
	if err := c.BindJSON(&artical); err == nil {
		e := model.AddArtical(&artical)
		if e != nil {
			c.JSON(http.StatusOK, gin.H{
				"ok":      false,
				"message": e,
			})
		} else {
			c.JSON(http.StatusOK, gin.H{
				"ok": true,
			})
		}
	} else {
		c.JSON(http.StatusOK, gin.H{
			"ok":      false,
			"message": "系统错误",
		})
	}
}

func ModifyArtical(c *gin.Context) {
	var artical model.Artical
	if err := c.BindJSON(&artical); err == nil {
		e := model.ModifyArtical(&artical)
		if e != nil {
			c.JSON(http.StatusOK, gin.H{
				"ok":      false,
				"message": e,
			})
		} else {
			c.JSON(http.StatusOK, gin.H{
				"ok": true,
			})
		}
	} else {
		c.JSON(http.StatusOK, gin.H{
			"ok":      false,
			"message": "系统错误",
		})
	}
}

func DeleteArtical(c *gin.Context) {
	id := c.Param("id")
	err := model.DelArtical(id)
	fmt.Println(err)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"ok":      false,
			"message": err,
		})
	} else {
		c.JSON(http.StatusOK, gin.H{
			"ok": true,
		})
	}
}

type ChangePwdStruct struct {
	Pwd   string
	Token string
}

func ChangePwd(c *gin.Context) {
	var newPwd ChangePwdStruct
	if err := c.BindJSON(&newPwd); err == nil {
		fmt.Println(newPwd)
		success := model.ChangeAdminPwd(newPwd.Pwd, newPwd.Token)
		if !success {
			c.JSON(http.StatusOK, gin.H{
				"ok":      false,
				"message": "token 不正确",
			})
		} else {
			c.JSON(http.StatusOK, gin.H{
				"ok":      true,
				"message": "修改成功",
			})
			tool.CleanSessions()
			// runtime.GC()
		}
	} else {
		c.JSON(http.StatusOK, gin.H{
			"ok":      false,
			"message": "系统错误",
		})
	}
}
