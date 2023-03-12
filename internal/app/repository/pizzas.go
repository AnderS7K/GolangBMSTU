package repository

import (
	"awesomeProject/internal/app/ds"
	"errors"
	"github.com/google/uuid"
	"gorm.io/gorm"
	"net/url"
)

func (r *Repository) GetPizzasList() ([]ds.Pizza, error) {

	var pizzas []ds.Pizza
	result := r.db.Order("price desc").Find(&pizzas)
	if result.Error != nil {
		return pizzas, result.Error
	}
	return pizzas, nil

}

func (r *Repository) GetPizza(uuid uuid.UUID) (ds.Pizza, error) {
	var pizza ds.Pizza
	err := r.db.First(&pizza, uuid).Error
	return pizza, err
}

func (r *Repository) GetPizzaName(uuid string) (string, error) {
	var pizza ds.Pizza
	err := r.db.Select("name").First(&pizza, "uuid = ?", uuid).Error
	return pizza.Name, err
}

func (r *Repository) AddPizza(pizza ds.Pizza) error {
	err := r.db.Create(&pizza).Error
	if err != nil {
		return err
	}
	return nil
}

func (r *Repository) GetPizzaPrice(uuid uuid.UUID) (uint64, error) {
	var pizza ds.Pizza
	err := r.db.First(&pizza, "uuid = ?", uuid).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return 404, err
		}
		return 500, err
	}
	return pizza.Price, nil
}

func (r *Repository) GetPizzaPriceByName(name string) (uint64, error) {
	var pizza ds.Pizza
	err := r.db.First(&pizza, "name = ?", name).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return 404, err
		}
		return 500, err
	}
	return pizza.Price, nil
}

func (r *Repository) ChangePizza(uuid uuid.UUID, pizza ds.Pizza) (int, error) {
	pizza.UUID = uuid
	err := r.db.Model(&pizza).Updates(ds.Pizza{Name: pizza.Name, Price: pizza.Price, Description: pizza.Description, Image: pizza.Image}).Error
	//if errors.Is(err, gorm.ErrRecordNotFound)
	if err != nil {
		return 500, err
	}
	return 0, nil
}

func (r *Repository) DeletePizza(uuid uuid.UUID) (int, error) {
	var pizza ds.Pizza
	err := r.db.First(&pizza, uuid).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return 404, err
		}
		return 500, err
	}
	err = r.db.Delete(&pizza, uuid).Error
	if err != nil {
		return 500, err
	}
	return 0, nil
}

func (r *Repository) GetFilteredPizzas(name, minPrice, maxPrice string) ([]ds.Pizza, error) {
	var pizzas []ds.Pizza
	var err error
	nm, _ := url.QueryUnescape(name)
	nm = "%" + nm + "%"
	if nm == "" {
		err = r.db.Order("price desc").Where("price > ? and price < ?", minPrice, maxPrice).Find(&pizzas).Error
		return pizzas, err
	} else {
		err = r.db.Order("price desc").Where("price > ? and price < ? and name LIKE ?", minPrice, maxPrice, nm).Find(&pizzas).Error
		return pizzas, err
	}

	return pizzas, err
}
