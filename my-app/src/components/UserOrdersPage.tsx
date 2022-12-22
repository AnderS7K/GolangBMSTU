import {IOrder} from "../models";
import React, {createContext} from "react";
import {orders_context} from "../context/context";
import {Navbar} from "./Navbar";
import {GetUserOrders} from "../requests/GetUserOrders";
import {UserOrders} from "./UserOrders";

export const MyContext = createContext(orders_context);

export function UserOrdersPage() {
    let orders = GetUserOrders()
    let showOrders = true
    if (orders.length === 0) {
        showOrders = false
    }
    console.log(orders)
    return (
        <>
            <Navbar/>

            <div className="bg-gray-100 min-h-screen">

                <div className="px-2 sm:px-0 pt-5 flex flex-col gap-0 mx-auto container">
                    <div className="border-2 border-slate-300 -mb-1 rounded py-2  grid grid-cols-3">
                        <p className="place-self-center text-lg font-bold">
                            Пиццы
                        </p>

                        <div className="place-self-center text-lg font-bold">
                            <p className="place-self-center text-lg font-bold">
                                Дата
                            </p>

                        </div>

                        <div className="place-self-center text-lg font-bold">
                            <p className="place-self-center text-lg font-bold">
                                Статус
                            </p>
                        </div>
                    </div>
                    {showOrders &&  orders.map((order: IOrder, key: any) => {
                        return (
                            <MyContext.Provider value={order} key={key}>
                                <UserOrders/>
                            </MyContext.Provider>
                        )
                    })}
                    {!showOrders && <h1 className="text-2xl text-center">Заказов нет!</h1>}
                </div>
            </div>
        </>
    )
}