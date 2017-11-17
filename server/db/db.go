package db

import (
	"fmt"

	"gopkg.in/mgo.v2"
)

const (
	MONGO_URL = "115.159.58.205:27017"
)

// User 用表
var User *mgo.Collection
var Articals *mgo.Collection

var MongoSession *mgo.Session
var DB *mgo.Database

func init() {
	diaInfo := &mgo.DialInfo{
		Addrs:    []string{MONGO_URL},
		Username: "admin",
		Password: "yunfeng0409",
	}

	MongoSession, err := mgo.DialWithInfo(diaInfo)
	defer MongoSession.Clone()
	if err != nil {
		fmt.Println("错误❌", err)
	} else {
		fmt.Println("👌数据库链接成功")
	}
	//切换到数据库
	DB = MongoSession.DB("enyouIndex")
	//切换到collection
	User = DB.C("users")
	Articals = DB.C("articals")
}
