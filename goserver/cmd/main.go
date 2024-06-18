package main

import (
	"log"
	"net/http"

	"goserver/internal/database"
	"goserver/internal/router"
)

func main() {
	database.Init()

	r := router.SetupRouter()
	log.Fatal(http.ListenAndServe(":3000", r))
}
