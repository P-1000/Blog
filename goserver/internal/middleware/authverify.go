package middleware

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

func AuthVerify() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := c.GetHeader("Authorization")
		if tokenString == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
			c.Abort()
			return
		}
		tokenString = strings.Trim(tokenString, "Bearer")
		tokenString = strings.TrimSpace(tokenString)
		claims := &jwt.MapClaims{}
		token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
			return []byte("your_secret_key"), nil
		})

		if err != nil || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
			c.Abort()
			return
		}

		userId, ok := (*claims)["userID"].(string)
		if !ok {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "bankai"})
			c.Abort()
			return
		}
		fmt.Println(userId)

		c.Set("userId", userId)
		c.Next()
	}
}
