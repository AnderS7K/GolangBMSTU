import {Link} from "react-router-dom"
import React, {useContext, useState} from "react";
import {MyContext} from "./HomePage";
import {AddToCart} from "../requests/AddToCart";
import {getRole, getToken} from "../modules";
import {DeletePizza} from "../requests/DeletePizza";




export function Pizza() {
    const ctx = useContext(MyContext)
    let access_token = getToken()
    let showAddCartButton = true
    if (access_token == "") {
        showAddCartButton = false
    }
    const [roles, setRole] = useState()
    const role = getRole(access_token)
    role.then((result) => {
        setRole(result)
    })
    let showManagerButton = false
    if (roles === 1) {
        showManagerButton = true
    }
    return (
        <div
            className="py-3 px-0 rounded flex flex-col justify-self-center items-center mb-2 place-content-start"
        >
            <img src={ctx.Image} className="w-3/5 sm:w-4/5" alt={ctx.Name}/>
            <Link to="/description"
                  className="text-2xl"
                  state={{Name: ctx.Name, Price: ctx.Price, Description: ctx.Description, Image: ctx.Image}}
            >
                { ctx.Name }
            </Link>
            <p className="text-xl font-bold">{ctx.Price} рублей</p>
            {showAddCartButton && <p className="mt-2 border-4 border-stone-700 text-stone-700 hover:bg-stone-700 hover:text-white sm:px-3 place-content-between rounded-full text-xl font-bold">
                {AddToCart(ctx.UUID)}
            </p>}
            {showManagerButton && <p className="mt-2 border-4 border-stone-700 text-stone-700 hover:bg-stone-700 hover:text-white sm:px-3 place-content-between rounded-full text-xl font-bold">
                {DeletePizza(ctx.UUID)}
            </p>}
            {showManagerButton && <Link to="/change" className="mt-2 border-4 border-stone-700 text-stone-700 hover:bg-stone-700 hover:text-white sm:px-3 place-content-between rounded-full text-xl font-bold"
                                        state={{UUID: ctx.UUID, Name: ctx.Name, Price: ctx.Price, Description: ctx.Description, Image: ctx.Image}}
            >
                Изменить
            </Link>}
        </div>

    )
}