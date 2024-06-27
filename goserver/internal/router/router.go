package router

import (
	"goserver/internal/auth"
	"goserver/internal/blog"
	"goserver/internal/user"

	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()
	authRoutes := r.Group("/auth")
	auth.RegisterRoutes(authRoutes)
	blogRoutes := r.Group("/blog")
	blog.RegisterRoutes(blogRoutes)
	followRoutes := r.Group("/follow")
	user.RegisterRoutes(followRoutes)
	return r
}
