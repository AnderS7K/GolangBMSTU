import {addPizza} from "../modules";
import React from "react";


export function AddingPizza(name: string, price: number, description: string, image: string) {

    const url = `pizzas`

    function Add() {
        addPizza(url, name, price, description, image)
    }


    return (
        <>
            <button
                onClick={() => Add()}
                className="inline-flex justify-center rounded-md border border-transparent bg-stone-600 py-2 px-4 text-base font-medium text-white shadow-sm hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2"
            >
                Добавить
            </button>
        </>
    );

}

