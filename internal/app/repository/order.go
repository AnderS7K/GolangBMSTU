package repository

import (
	"awesomeProject/internal/app/ds"
	"errors"
	"github.com/google/uuid"
	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"net/url"
	"time"
)

func (r *Repository) AddOrder(order ds.Order) error {
	var names []string
	log.Println(order.Pizzas)
	for _, val := range order.Pizzas {
		name, err := r.GetPizzaName(val)
		if err != nil {
			return err
		}
		names = append(names, name)
	}
	log.Println(names)

	order.Pizzas = names
	//date := time.Now().Add(time.Hour * 3)
	var err error
	order.DateCreated = time.Now() //, err = time.Parse("2006-01-02 15:04:05", date.Format("2006-01-02 15:04:05"))
	order.Status = "Оформлен"
	log.Println(order)

	err = r.db.Create(&order).Error
	if err != nil {
		return err
	}
	err = r.DeleteByUser(order.UserUUID)
	if err != nil {
		return err
	}
	return nil
}

func (r *Repository) GetOrders(stDate, endDate, status string) ([]ds.Order, error) {
	var orders []ds.Order
	var err error
	st, _ := url.QueryUnescape(status)
	log.Println(st)
	if st == "Все статусы" {
		st = ""
	}
	if st == "" {
		if stDate == "" && endDate == "" {
			err = r.db.Order("date_created").Find(&orders).Error
			return orders, err
		} else if stDate != "" && endDate == "" {
			err = r.db.Order("date_created").Where("date_created > ?", stDate).Find(&orders).Error
			return orders, err
		} else if stDate == "" && endDate != "" {
			err = r.db.Order("date_created").Where("date_created < ?", endDate).Find(&orders).Error
			return orders, err
		} else if stDate != "" && endDate != "" {
			err = r.db.Order("date_created").Where("date_created > ? and date_created < ?", stDate, endDate).Find(&orders).Error
			return orders, err
		}
	} else {
		if stDate == "" && endDate == "" {
			err = r.db.Order("date_created").Where("status = ?", st).Find(&orders).Error
			return orders, err
		} else if stDate != "" && endDate == "" {
			err = r.db.Order("date_created").Where("date_created > ? and status = ?", stDate, st).Find(&orders).Error
			return orders, err
		} else if stDate == "" && endDate != "" {
			err = r.db.Order("date_created").Where("date_created < ? and status = ?", endDate, st).Find(&orders).Error
			return orders, err
		} else if stDate != "" && endDate != "" {
			err = r.db.Order("date_created").Where("date_created > ? and date_created < ? and status = ?", stDate, endDate, st).Find(&orders).Error
			return orders, err
		}
	}

	return orders, nil
}

func (r *Repository) ChangeStatus(uuid uuid.UUID, status string) (int, error) {
	var order ds.Order
	err := r.db.First(&order, "uuid = ?", uuid).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return 404, err
		}
		return 500, err
	}
	if status == "Оплачен" {
		err = r.db.Model(&order).Updates(ds.Order{DatePayed: time.Now(), Status: status}).Error
	} else if status == "Передан в доставку" {
		err = r.db.Model(&order).Updates(ds.Order{DateDeliveredStart: time.Now(), Status: status}).Error
	} else if status == "Доставлен" {
		err = r.db.Model(&order).Updates(ds.Order{DateDeliveredEnd: time.Now(), Status: status}).Error
	}
	if err != nil {
		return 500, err
	}
	return 0, nil
}

func (r *Repository) GetOrdersByUser(uuid uuid.UUID, stDate, endDate, status string) ([]ds.Order, error) {
	var orders []ds.Order
	var err error
	st, _ := url.QueryUnescape(status)
	log.Println(st)
	if st == "Все статусы" {
		st = ""
	}
	if st == "" {
		if stDate == "" && endDate == "" {
			err = r.db.Order("date_created").Find(&orders).Error
			return orders, err
		} else if stDate != "" && endDate == "" {
			err = r.db.Order("date_created").Where("date_created > ?", stDate).Find(&orders).Error
			return orders, err
		} else if stDate == "" && endDate != "" {
			err = r.db.Order("date_created").Where("date_created < ?", endDate).Find(&orders).Error
			return orders, err
		} else if stDate != "" && endDate != "" {
			err = r.db.Order("date_created").Where("date_created > ? and date_created < ?", stDate, endDate).Find(&orders).Error
			return orders, err
		}
	} else {
		if stDate == "" && endDate == "" {
			err = r.db.Order("date_created").Where("status = ?", st).Find(&orders).Error
			return orders, err
		} else if stDate != "" && endDate == "" {
			err = r.db.Order("date_created").Where("date_created > ? and status = ?", stDate, st).Find(&orders).Error
			return orders, err
		} else if stDate == "" && endDate != "" {
			err = r.db.Order("date_created").Where("date_created < ? and status = ?", endDate, st).Find(&orders).Error
			return orders, err
		} else if stDate != "" && endDate != "" {
			err = r.db.Order("date_created").Where("date_created > ? and date_created < ? and status = ?", stDate, endDate, st).Find(&orders).Error
			return orders, err
		}
	}

	return orders, nil
}
