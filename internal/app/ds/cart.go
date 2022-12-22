package ds

import "github.com/google/uuid"

type Cart struct {
	UUID     uuid.UUID `db:"uuid" gorm:"type:uuid;default:uuid_generate_v4();primary_key"`
	Pizza    uuid.UUID `db:"pizza"`
	UserUUID uuid.UUID `db:"user_uuid"`
}

func (Cart) TableName() string {
	return "cart"
}
