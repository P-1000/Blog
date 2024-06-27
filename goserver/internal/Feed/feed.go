package feed

import (
	"goserver/internal/middleware"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.RouterGroup) {
	r.GET("/feed/general", middleware.AuthVerify(), getGeneralFeed)
}
