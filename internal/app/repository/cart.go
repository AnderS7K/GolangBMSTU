package repository

import (
	"awesomeProject/internal/app/ds"
	"github.com/google/uuid"
)

func (r *Repository) GetCart(userUUID uuid.UUID) ([]ds.Cart, error) {
	var cart []ds.Cart
	err := r.db.Where("user_uuid = ?", userUUID).Find(&cart).Error
	return cart, err
}

func (r *Repository) AddToCart(cart ds.Cart, userUUID uuid.UUID) error {
	cart.UserUUID = userUUID
	err := r.db.Create(&cart).Error
	if err != nil {
		return err
	}
	return nil
}

func (r *Repository) DeleteFromCart(pizza uuid.UUID, userUUID uuid.UUID) (int, error) {
	var cart ds.Cart
	err := r.db.Where("pizza = ? AND user_uuid = ?", pizza, userUUID).Delete(&cart).Error
	if err != nil {
		return 500, err
	}
	return 0, nil
}

func (r *Repository) DeleteByUser(userUUID uuid.UUID) error {
	var cart ds.Cart
	err := r.db.Where("user_uuid = ?", userUUID).Delete(&cart).Error
	if err != nil {
		return err
	}
	return nil
}
