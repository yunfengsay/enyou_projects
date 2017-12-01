package db

import (
	"fmt"
	"projects/enyou/server/conf"

	"projects/enyou/server/tool"

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type UserStruct struct {
	Id       bson.ObjectId `bson:"_id"`
	UserName string        `json:"user_name"`
	Pwd      string        `json:"pwd"`
}

var User *mgo.Collection
var Articals *mgo.Collection
var Laws *mgo.Collection

var MongoSession *mgo.Session
var DB *mgo.Database

func MakeDataBase() {
	var (
		DBUrl     = conf.ConfigContext.DBUrl
		DBName    = conf.ConfigContext.DBName
		DBUser    = conf.ConfigContext.DBUser
		DBPwd     = conf.ConfigContext.DBPwd
		AdminUser = conf.ConfigContext.AdminUser
		AdminPwd  = conf.ConfigContext.AdminPwd
	)
	diaInfo := &mgo.DialInfo{
		Addrs:    []string{DBUrl},
		Username: DBUser,
		Password: DBPwd,
	}
	MongoSession, err := mgo.DialWithInfo(diaInfo)
	defer MongoSession.Clone()
	if err != nil {
		fmt.Println("错误❌", err)
	} else {
		fmt.Println("👌数据库链接成功")
	}
	//切换到数据库
	DB = MongoSession.DB(DBName)
	//切换到collection
	User = DB.C("users")
	Articals = DB.C("articals")
	Laws = DB.C("laws")
	User.Remove(nil)
	user := UserStruct{}
	user.Pwd = tool.GetMd5(AdminPwd)
	user.UserName = AdminUser
	user.Id = bson.NewObjectId()
	fmt.Println("😄 ", &user)
	User.Insert(&user)
}
