import {ICart} from "../models";
import {Cart} from "./Cart";
import {GetCart} from "../requests/GetCart";
import React, {createContext} from "react";
import {cart_context} from "../context/context";
import {Navbar} from "./Navbar";
import {AddOrder} from "../requests/AddOrder";


export const MyContext = createContext(cart_context);

export function CartPage() {
    let cart = GetCart()
    let showCart = true
    if (cart.length === 0) {
        showCart = false
    }
    let pizzas_uuid: string[] = new Array()
    cart.map((cart: ICart) => {
        pizzas_uuid.push(cart.Pizza)
    })
    return (
        <>
            <Navbar/>
        <div className="bg-gray-100 min-h-screen">
            <div className="container grid grid-cols-1 sm:grid-cols-3 gap-2 mx-auto">
                {showCart &&  cart.map((cart: ICart, key: any) => {
                    return (
                        <MyContext.Provider value={cart} key={key}>
                            <Cart/>
                        </MyContext.Provider>
                    )
                })}
                {!showCart && <h1 className="text-2xl text-center">Ваша корзина пуста!</h1>}
            </div>
            {showCart &&
                <form>
                    <p className="text-center">
                        {AddOrder(pizzas_uuid)}
                    </p>
                </form>}
        </div>

        </>
    )
}