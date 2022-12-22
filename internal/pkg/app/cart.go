package app

import (
	"awesomeProject/internal/app/ds"
	"awesomeProject/swagger/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"net/http"
)

func (a *Application) GetCart(gCtx *gin.Context) {
	jwtStr := gCtx.GetHeader("Authorization")
	userUUID := a.GetUserByToken(jwtStr)

	resp, err := a.repo.GetCart(userUUID)
	if err != nil {
		gCtx.JSON(
			http.StatusInternalServerError,
			&models.ModelError{
				Description: "can`t get a list",
				Error:       models.Err500,
				Type:        models.TypeInternalReq,
			})
		return
	}
	gCtx.JSON(http.StatusOK, resp)

}

func (a *Application) AddToCart(gCtx *gin.Context) {
	jwtStr := gCtx.GetHeader("Authorization")
	userUUID := a.GetUserByToken(jwtStr)
	cart := ds.Cart{}
	err := gCtx.BindJSON(&cart)
	if err != nil {
		gCtx.JSON(
			http.StatusBadRequest,
			&models.ModelError{
				Description: "Invalid parameters",
				Error:       models.Err400,
				Type:        models.TypeClientReq,
			})
		return
	}
	err = a.repo.AddToCart(cart, userUUID)
	if err != nil {
		gCtx.JSON(
			http.StatusInternalServerError,
			&models.ModelError{
				Description: "Create failed",
				Error:       models.Err500,
				Type:        models.TypeInternalReq,
			})
		return
	}
	gCtx.JSON(
		http.StatusOK,
		&models.ModelCartCreated{
			Success: true,
		})

}

func (a *Application) DeleteFromCart(gCtx *gin.Context) {
	UUID, err := uuid.Parse(gCtx.Param("uuid"))
	jwtStr := gCtx.GetHeader("Authorization")
	userUUID := a.GetUserByToken(jwtStr)

	if err != nil {
		gCtx.JSON(
			http.StatusBadRequest,
			&models.ModelError{
				Description: "Invalid UUID format",
				Error:       models.Err400,
				Type:        models.TypeClientReq,
			})
		return
	}
	resp, err := a.repo.DeleteFromCart(UUID, userUUID)
	if err != nil {
		if resp == 404 {
			gCtx.JSON(
				http.StatusNotFound,
				&models.ModelError{
					Description: "UUID Not Found",
					Error:       models.Err404,
					Type:        models.TypeClientReq,
				})
			return
		} else {
			gCtx.JSON(
				http.StatusInternalServerError,
				&models.ModelError{
					Description: "Delete failed",
					Error:       models.Err500,
					Type:        models.TypeInternalReq,
				})
			return
		}
	}
	gCtx.JSON(
		http.StatusOK,
		&models.ModelCartDeleted{
			Success: true,
		})

}
