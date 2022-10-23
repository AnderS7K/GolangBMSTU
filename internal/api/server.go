package api

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Present struct {
	Name  string
	Price int
}
type BirthdayPresents struct {
	Person   string
	Presents []Present
}

func StartServer() {
	log.Println("Server start up")

	list := BirthdayPresents{
		Person: "AnderS7",
		Presents: []Present{
			{"Peperoni", 999},
			{"Margaritta", 650},
			{"Cheezy", 550},
		},
	}

	r := gin.Default()

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	r.LoadHTMLGlob("templates/*")

	r.GET("/home", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.tmpl", gin.H{
			"title": "Main website",
		})
	})

	r.GET("/presents", func(c *gin.Context) {
		c.HTML(http.StatusOK, "presents.tmpl", gin.H{
			"Person":   list.Person,
			"Presents": list.Presents,
		})
	})

	r.Static("/image", "./resources")

	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")

	log.Println("Server down")
}
