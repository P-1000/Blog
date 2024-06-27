package router

import (
	"goserver/internal/auth"
	"goserver/internal/blog"
	"goserver/internal/user"

	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	// CORS configuration
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"}, // Adjust to your frontend origin
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	authRoutes := r.Group("/auth")
	auth.RegisterRoutes(authRoutes)

	blogRoutes := r.Group("/blog")
	blog.RegisterRoutes(blogRoutes)

	followRoutes := r.Group("/follow")
	user.RegisterRoutes(followRoutes)

	return r
}
