package router

import (
	"goserver/internal/auth"

	"github.com/gin-gonic/gin"
	"goserver/internal/blog"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()
	authRoutes := r.Group("/auth")
	auth.RegisterRoutes(authRoutes)
	blogRoutes := r.Group("/blog")
	blog.RegisterRoutes(blogRoutes)
	return r
}
