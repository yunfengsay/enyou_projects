package model

import (
	"fmt"
	"projects/enyou/server/conf"
	"projects/enyou/server/db"
	"projects/enyou/server/tool"

	"gopkg.in/mgo.v2/bson"
)

type UserStruct struct {
	Id       bson.ObjectId `bson:"_id"`
	UserName string        `json:"user_name"`
	Pwd      string        `json:"pwd"`
}

type Artical struct {
	Id    bson.ObjectId `bson:"_id"`
	Title string        `json:"title"`
	Url   string        `json:"url"`
}

func AddUser(user *UserStruct) (err error) {
	user.Pwd = tool.GetMd5(user.Pwd)
	user.Id = bson.NewObjectId()
	err = db.User.Insert(user)
	return
}

func UserLogin(user string, pwd string) bool {
	fmt.Println("user ", user)
	count, err := db.User.Find(bson.M{"username": user, "pwd": pwd}).Count()
	if err != nil {
		fmt.Println("User login error")
	}
	if count == 0 {
		return false
	} else {
		return true
	}
}

func AddArtical(artical *Artical) (err error) {
	artical.Id = bson.NewObjectId()
	err = db.Articals.Insert(artical)
	return
}

func DelArtical(id string) (err error) {
	err = db.Articals.Remove(bson.M{"_id": bson.ObjectIdHex(id)})
	return
}

func GetAllArtical() (articals []Artical, err error) {
	err = db.Articals.Find(nil).All(&articals)
	return
}

func ModifyArtical(artical *Artical) (err error) {
	err = db.Articals.Update(bson.M{"_id": artical.Id}, artical)
	return
}

func ChangeAdminPwd(pwd string, token string) (success bool) {
	if token == conf.ConfigContext.ChangePwdToken {
		db.User.Remove(nil)
		user := UserStruct{}
		fmt.Println("😨😨😨😨😨😨😨😨😨😨😨😨 新密码是   ", pwd)
		user.Pwd = tool.GetMd5(pwd)
		user.UserName = conf.ConfigContext.AdminUser
		user.Id = bson.NewObjectId()
		db.User.Insert(&user)
		return true
	}
	return false
}
