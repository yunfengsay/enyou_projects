package db

import (
	"gopkg.in/mgo.v2"
)

const (
	MONGO_URL = "115.159.58.205:27017"
)

var User *mgo.Collection
var Ariticals *mgo.Collection

var MongoSession *mgo.Session
var DB *mgo.Database

func init() {
	MongoSession, _ = mgo.Dial(MONGO_URL)
	//切换到数据库
	DB = MongoSession.DB("enyouIndex")
	//切换到collection
	User = DB.C("users")
	Ariticals = DB.C("articals")
}
