import {IPizza, IOrder} from "../models";
import {ICart} from "../models";

export let pizza_context: IPizza = {
    UUID: "",
    Name: "",
    Price: 0,
    Description: "",
    Image: "",
}
export let cart_context: ICart = {
    UUID: "",
    Pizza: "",
}

export let orders_context: IOrder = {
    UUID: "",
    Pizzas: [""],
    UserUUID: "",
    Date: "",
    Status: "",
}