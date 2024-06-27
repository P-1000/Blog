package user

import (
	"goserver/internal/middleware"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.RouterGroup) {
	r.POST("/:id", middleware.AuthVerify(), followUser)
	r.DELETE("/:id", middleware.AuthVerify(), unfollowUser)
}
