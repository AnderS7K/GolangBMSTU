-- +goose Up
-- +goose StatementBegin

create table orders
(
    uuid      uuid NOT NULL DEFAULT uuid_generate_v4() primary key,
    pizzas      text[],
    user_uuid uuid,
    date      timestamp,
    status    text,
    foreign key (user_uuid) references users (uuid) ON DELETE CASCADE

);

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE orders;
-- +goose StatementEnd