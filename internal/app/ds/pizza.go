package ds

import (
	"github.com/google/uuid"
)

type Pizza struct {
	UUID        uuid.UUID `db:"uuid" gorm:"type:uuid;default:uuid_generate_v4();primary_key"`
	Name        string    `db:"name"`
	Price       uint64    `db:"price"`
	Description string    `db:"description"`
	Image       string    `db:"image"`
}
