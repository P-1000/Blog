package feed

import (
	"goserver/internal/middleware"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.RouterGroup) {
	r.GET("/feed/general/:page", getGeneralFeed)
	r.GET("feed/custom", middleware.AuthVerify(), customFeed)
}
