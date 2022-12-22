package main

import (
	"awesomeProject/internal/pkg/app"
	"context"
	log "github.com/sirupsen/logrus"
	"os"
)

func main() {
	ctx := context.Background()
	log.Println("app start")

	application, err := app.New(ctx)
	if err != nil {
		log.Printf("cant create application: %s", err)

		os.Exit(2)
	}

	err = application.Run()
	if err != nil {
		log.Printf("can`t run application: %s", err)
		os.Exit(2)
	}
	log.Println("app terminated")
}
