// package main

// import (
// 	"context"
// 	"lab1/internal/pkg/app"
// 	"log"
// 	"os"
// )

// func main() {
// 	ctx := context.Background()
	
// 	application, err := app.NewApp(ctx)
// 	if err != nil {
// 		log.Println("cant create application", err)
// 		os.Exit(2)
// 	}

// 	log.Println("Application start!")
// 	application.RunApp()
// 	log.Println("Application terminated!")
// }

package main

import (
	"context"
	"lab1/internal/pkg/app"
	"log"
	"os"
)

// @title Data Growth Forecast
// @version 1.0
// @description BMSTU Open IT Platform. API для работы с факторами роста данных, запросами на прогноз и пользователями.
// @contact.name Belikov Konstantin
// @contact.email konstantinbelicov@gmail.com
// @host 127.0.0.1:8080
// @schemes http
// @BasePath /

func main() {
	ctx := context.Background()

	application, err := app.NewApp(ctx)
	if err != nil {
		log.Println("cant create application", err)
		os.Exit(2)
	}

	log.Println("Application start!")
	application.RunApp()
	log.Println("Application terminated!")
}




