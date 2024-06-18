package database

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	client *mongo.Client
	ctx    context.Context
	cancel context.CancelFunc
)

const dbName = "yourdb" // Change this to your database name

func Init() {
	var err error
	ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)

	mongoURI := "mongodb://localhost:27017"

	client, err = mongo.Connect(ctx, options.Client().ApplyURI(mongoURI))
	if err != nil {
		log.Fatal("Failed to connect to MongoDB:", err)
	}

	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal("Failed to ping MongoDB:", err)
	}

	log.Println("Connected to MongoDB")
}

func GetMongoClient() *mongo.Client {
	if client == nil {
		log.Fatal("MongoDB client is not initialized")
	}
	return client
}

func GetCollection(collectionName string) *mongo.Collection {
	return GetMongoClient().Database(dbName).Collection(collectionName)
}
