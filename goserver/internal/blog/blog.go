package blog

import (
	"goserver/internal/middleware"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.RouterGroup) {

	r.POST("/blog", middleware.AuthVerify(), createBlog)
	r.GET("/blog/:blogId", middleware.AuthVerify(), getBlogById)
	r.PUT("/blog/:id", middleware.AuthVerify(), updateBlog)
	r.DELETE("/blog/:id", middleware.AuthVerify(), deleteBlog)
	r.PUT("/blog/like/:id", middleware.AuthVerify(), likeBlog)
	r.PUT("/blog/unlike/:id", middleware.AuthVerify(), unLikeBlog)
	r.POST("/blog/:blogId/comment", middleware.AuthVerify(), addComment)
	r.GET("/blog/:blogId/comments", middleware.AuthVerify(), getComments) //todo
}
