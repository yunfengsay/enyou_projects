package model

import (
	"fmt"
	"projects/enyou/server/db"
	"projects/enyou/server/tool"

	"gopkg.in/mgo.v2/bson"
)

type UserStruct struct {
	Id       bson.ObjectId `bson:"_id"`
	UserName string        `json:"use_rname"`
	Pwd      string        `json:"pwd"`
}

type Artical struct {
	Id    bson.ObjectId `bson:"_id"`
	Title string        `json:"title"`
	url   string        `json:"url"`
}

func AddUser(user *UserStruct) (err error) {
	user.Pwd = tool.GetMd5(user.Pwd)
	err = db.User.Insert(user)
	return
}

func UserLogin(user string, pwd string) bool {
	count, err := db.User.Find(bson.M{"user_name": user}).Count()
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
	err = db.Ariticals.Insert(artical)
	return
}

func DelArtical(id string) (err error) {
	err = db.Ariticals.Remove(bson.M{"id": bson.ObjectIdHex(id)})
	return
}

func GetAllArtical() (articals []Artical, err error) {
	err = db.Ariticals.Find(nil).All(&articals)
	return
}
