package ds

import (
	"github.com/google/uuid"
	"github.com/lib/pq"
	"time"
)

type Order struct {
	UUID               uuid.UUID      `db:"uuid" gorm:"type:uuid;default:uuid_generate_v4();primary_key"`
	Pizzas             pq.StringArray `db:"pizzas" gorm:"type:text[]"`
	UserUUID           uuid.UUID      `db:"user_uuid"`
	DateCreated        time.Time      `db:"date_created" gorm:"type:timestamp"`
	DatePayed          time.Time      `db:"date_payed" gorm:"type:timestamp"`
	DateDeliveredStart time.Time      `db:"date_delivered_start" gorm:"type:timestamp"`
	DateDeliveredEnd   time.Time      `db:"date_delivered_end" gorm:"type:timestamp"`
	Status             string         `db:"status"`
}

func (o *Order) GetDatePayedAndStatus() string {
	date := o.DatePayed.Format("2006-01-02 15:04:05")
	return date + " " + o.Status
}
