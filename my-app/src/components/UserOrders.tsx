import React, {useContext} from "react";
import {MyContext} from "./UserOrdersPage";

export function UserOrders() {
    const ctx = useContext(MyContext)
    console.log(ctx.Status)
    let isList = true
    if (ctx.Pizzas.length === 1) {
        isList = false
    }
    return (
        <div className="border-2 border-slate-300 -mb-1 rounded py-2  grid grid-cols-6">
            <div className="place-self-center">
                {isList && ctx.Pizzas.map((car, key) => {
                    return <p className="pl-2 text-center text-lg" key={key}>{key+1}) {car}</p>
                })}
                {!isList && ctx.Pizzas.map((car, key) => {
                    return <p className="pl-2 text-center text-lg" key={key}>{car}</p>
                })}
            </div>

            <p className="place-self-center text-lg">
                {ctx.DateCreated.replace("T", " ").split(".")[0]}
            </p>
            <p className="place-self-center text-lg">
                { ctx.DatePayed === "0001-01-01T00:00:00Z" &&  <p></p>}
                { !(ctx.DatePayed === "0001-01-01T00:00:00Z") &&  ctx.DatePayed.replace("T", " ").split(".")[0]}
            </p>
            <p className="place-self-center text-lg">
                { ctx.DateDeliveredStart === "0001-01-01T00:00:00Z" &&  <p></p>}
                { !(ctx.DateDeliveredStart === "0001-01-01T00:00:00Z") &&  ctx.DateDeliveredStart.replace("T", " ").split(".")[0]}
            </p>
            <p className="place-self-center text-lg">
                { ctx.DateDeliveredEnd === "0001-01-01T00:00:00Z" &&  <p></p>}
                { !(ctx.DateDeliveredEnd === "0001-01-01T00:00:00Z") &&  ctx.DateDeliveredEnd.replace("T", " ").split(".")[0]}
            </p>

            <p className="place-self-center text-lg">
                {ctx.Status}
            </p>

        </div>
    )
}
