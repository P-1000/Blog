package router

import (
	"github.com/gin-gonic/gin"
	"goserver/internal/auth"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()
	authRoutes := r.Group("/auth")
	auth.RegisterRoutes(authRoutes)
	return r
}
