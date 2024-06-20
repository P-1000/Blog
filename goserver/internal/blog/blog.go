package blog

import (
	"goserver/internal/middleware"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.RouterGroup) {
	r.POST("/blog", middleware.AuthVerify(), createBlog)
}
