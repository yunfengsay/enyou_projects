package model

import (
	"projects/enyou/server/db"

	"gopkg.in/mgo.v2/bson"
)

type UserStruct struct {
	UserName string `json:"user_name"`
	Pwd      string `json:"pwd"`
}

type Artical struct {
	Id    bson.ObjectId `bson:"_id"`
	Title string        `json:"title"`
	url   string        `json:"url"`
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
