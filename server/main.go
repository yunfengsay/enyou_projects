package server
import (
	"net/http"
	"github.com/gin-gonic/gin"
)

func main(){
	router := gin.Default()
	router.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "ok")
	})
	router.Run(":8000")
}
