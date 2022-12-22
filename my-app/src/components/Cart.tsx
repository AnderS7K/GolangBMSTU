
import {GetPizza} from "../requests/GetPizza";
import {Link} from "react-router-dom";
import React, {useContext} from "react";
import {MyContext} from "./CartPage";
import {DeleteFromCart} from "../requests/DeleteFromCart";


export function Cart() {
    const ctx = useContext(MyContext)
    let Pizza = GetPizza(ctx.Pizza)
    return (

        <div
            className="py-3 px-0 rounded flex flex-col justify-self-center items-center mb-2 place-content-start"
        >
            <img src={Pizza.Image} className="w-1/2 sm:w-1/5" alt={Pizza.Name}/>
            <p className="text-2xl">{ Pizza.Name }</p>
            <p className="text-2xl">{Pizza.Description}</p>
            <p className="font-bold">{Pizza.Price} рублей</p>

            <p className="mt-2 border-4 border-stone-700 text-stone-700 hover:bg-stone-700 hover:text-white sm:px-3 place-self-auto rounded-full text-xl font-bold">
                {DeleteFromCart(Pizza.UUID)}
            </p>


        </div>
    )
}
