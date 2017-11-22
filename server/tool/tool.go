package tool

import (
	"crypto/md5"
	"fmt"
	"io"
)

var salt = "oifjiejnabpoe[fjovni"

var Sessions = make(map[string]string)

func CleanSessions() {
	for k := range Sessions {
		delete(Sessions, k)
	}
}

func GetMd5(str string) string {
	w := md5.New()
	io.WriteString(w, str+salt)              //加盐 将str写入到w中
	md5str2 := fmt.Sprintf("%x", w.Sum(nil)) //w.Sum(nil)将w的hash转成[]byte格式
	return md5str2
}
