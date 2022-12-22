-- +goose Up
-- +goose StatementBegin

create table cart
(
    uuid uuid NOT NULL DEFAULT uuid_generate_v4() primary key,
    pizza uuid,
    user_uuid uuid,
    foreign key (pizza) references pizzas(uuid) ON DELETE CASCADE,
    foreign key (user_uuid) references users(uuid) ON DELETE CASCADE

);

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE cart;
-- +goose StatementEnd