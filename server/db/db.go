package db

import (
	"fmt"
	"projects/enyou/server/conf"

	"gopkg.in/mgo.v2"
)

var (
	MONGO_URL = conf.ConfigContext.MgoUrl
	DBName    = conf.ConfigContext.DBName
	DBUser    = conf.ConfigContext.DBUser
	DBPwd     = conf.ConfigContext.DBPwd
)

// User 用表
var User *mgo.Collection
var Articals *mgo.Collection

var MongoSession *mgo.Session
var DB *mgo.Database

func main() {
	diaInfo := &mgo.DialInfo{
		Addrs:    []string{MONGO_URL},
		Username: DBUser,
		Password: DBPwd,
	}
	fmt.Println(DBName, DBUser, DBPwd)
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
}
