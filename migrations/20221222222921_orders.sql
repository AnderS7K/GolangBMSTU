-- +goose Up
-- +goose StatementBegin

create table orders
(
    uuid      uuid NOT NULL DEFAULT uuid_generate_v4() primary key,
    pizzas      text[],
    user_uuid uuid,
    date_created      timestamp,
    date_payed     timestamp,
    date_delivered_start      timestamp,
    date_delivered_end      timestamp,
    status    text,
    foreign key (user_uuid) references users (uuid) ON DELETE CASCADE

);

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE orders;
-- +goose StatementEnd