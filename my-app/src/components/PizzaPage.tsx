import React from "react";
import {useLocation} from "react-router-dom"
import {Navbar} from "./Navbar";
import {Link} from "react-router-dom"


export function PizzaDescription() {

    return (
        <div>
            <Navbar/>
            <p className="ml-4 text-2xl font-normal text-black">
                <Link to="/pizzas">Pizzas</Link> / {useLocation().state.Name}
            </p>
            <div className="container mt-6 mx-auto">
        <div
            className="py-3 px-0 rounded flex flex-col justify-self-center items-center mb-2 place-content-start"
        >
            <img src={useLocation().state.Image} className="w-3/5 sm:w-1/5" alt={useLocation().state.Name}/>
            <p className="text-2xl">{ useLocation().state.Name }</p>
            <p className="text-2xl  text-center px-96">{ useLocation().state.Description }</p>
            <p className="text-xl font-bold">{useLocation().state.Price} рублей</p>

        </div>
            </div>
        </div>
    )
}