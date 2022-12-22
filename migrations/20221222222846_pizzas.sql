-- +goose Up
-- +goose StatementBegin
create table pizzas
(
    uuid          uuid NOT NULL DEFAULT uuid_generate_v4() primary key,
    name          text,
    price         int,
    description   text,
    image         text
);


-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE pizzas;
-- +goose StatementEnd