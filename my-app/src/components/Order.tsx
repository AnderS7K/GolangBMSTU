import React, {useContext} from "react";
import {MyContext} from "./OrderPage";
import {GetUser} from "../requests/GetUser";
import {getToken, updateStatus} from "../modules";




export function Order() {
    const ctx = useContext(MyContext)

    let statusMap = new Map<string, string>([
        ["Оформлен", "Оплачен"],
        ["Оплачен", "Подтвержден"],
        ["Подтвержден", "Доставлен"],
    ]);

    let isList = true
    if (ctx.Pizzas.length === 1) {
        isList = false
    }
    let access_token = getToken()

    const handleChangeStatus = (event: { target: { value: any; }; }) => {
        ctx.Status = event.target.value
        updateStatus(access_token, ctx.UUID, ctx.Status)
        window.location.replace('/orders')
    };

    let showStatusButton = true
    if (ctx.Status === "Доставлен") {
        showStatusButton = false
    }

    return (
        <div className="border-2 border-slate-300 -mb-1 rounded py-2  grid grid-cols-5 ">
            <div className="place-self-center">
                {isList && ctx.Pizzas.map((car, key) => {
                    return <p className="pl-2 text-center text-lg" key={key}>{key+1}) {car}</p>
                })}
                {!isList && ctx.Pizzas.map((car, key) => {
                    return <p className="pl-2 text-center text-lg" key={key}>{car}</p>
                })}
            </div>

            <p className="place-self-center text-lg">
                {GetUser(ctx.UserUUID)}
            </p>

            <p className="place-self-center text-lg">
                {ctx.Date.replace("T", " ").split(".")[0]}
            </p>

            <p className="place-self-center text-lg">
                {ctx.Status}
            </p>

            <div className="place-self-center">
                {showStatusButton && <button className="mt-5 border-2 border-slate-300 border-stone-400 rounded-full" onClick={() => {
                    updateStatus(access_token, ctx.UUID, statusMap.get(ctx.Status)); window.location.replace('/orders')
                }}> { <p>{statusMap.get(ctx.Status)}</p>}</button>}

            </div>

        </div>
    )
}
