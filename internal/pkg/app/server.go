package app

import (
	"awesomeProject/internal/app/role"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, UPDATE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func (a *Application) StartServer() {
	log.Println("Server start up")

	r := gin.Default()

	r.Use(CORSMiddleware())

	r.LoadHTMLGlob("templates/*")

	r.GET("/templates", func(c *gin.Context) {
		pizzas, _ := a.repo.GetPizzasList()
		c.HTML(http.StatusOK, "pizzas.tmpl", gin.H{
			"Pizzas": pizzas,
		})
	})

	r.GET("/submit", a.TemplateDeletePizza)

	//r.GET("/pizzas", a.GetList)
	r.GET("/pizzas", a.GetFilteredPizzas)
	r.GET("/pizzas/:uuid", a.GetPizza)
	r.GET("/orders/:firstDate/:secondDate", a.GetOrdersSum)

	r.GET("/pizzas/price/:uuid", a.GetPizzaPrice)

	r.POST("/cart", a.AddToCart)
	r.POST("/orders", a.AddOrder)
	r.POST("/login", a.Login)
	r.POST("/sign_up", a.Register)
	r.GET("/logout", a.Logout)
	r.GET("/role", a.Role)

	r.DELETE("/cart/:uuid", a.DeleteFromCart)

	r.Use(a.WithAuthCheck(role.Buyer, role.Manager, role.Admin)).GET("/cart", a.GetCart)
	r.Use(a.WithAuthCheck(role.Buyer, role.Manager, role.Admin)).GET("/user_orders", a.GetOrdersByUser)
	r.Use(a.WithAuthCheck(role.Buyer, role.Manager)).GET("/user/:uuid", a.GetUser)
	r.Use(a.WithAuthCheck(role.Manager)).POST("/pizzas", a.AddPizza)
	r.Use(a.WithAuthCheck(role.Manager)).GET("/orders", a.GetOrders)
	r.Use(a.WithAuthCheck(role.Manager)).PUT("/orders/:uuid", a.ChangeStatus)
	r.Use(a.WithAuthCheck(role.Manager)).DELETE("/pizzas/:uuid", a.DeletePizza)
	r.Use(a.WithAuthCheck(role.Manager)).PUT("/pizzas/:uuid", a.ChangePizza)

	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")

	log.Println("Server down")
}
