import {changePizza} from "../modules";
import React from "react";


export function ChangingCar(uuid: string, name: string, price: number, description: string, image: string) {

    const url = `pizzas`

    function Change() {
        changePizza(uuid, url, name, price, description, image)
    }


    return (
        <>
            <button
                onClick={() => Change()}
                className="inline-flex justify-center rounded-md border border-transparent bg-stone-600 py-2 px-4 text-base font-medium text-white shadow-sm hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2"
            >
                Изменить
            </button>
        </>
    );

}

