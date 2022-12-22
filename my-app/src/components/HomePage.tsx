import {Pizza} from "./Pizza";
import {createContext, useState} from "react";
import React from "react";
import {IPizza} from "../models";
import {GetPizzas} from "../requests/GetPizzas";
import {pizza_context} from "../context/context";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import {Navbar} from "./Navbar";

export const MyContext = createContext(pizza_context);


export function HomePage() {
    const pizzas = GetPizzas()

    const [name, setName] = useState('')

    const filteredPizzas = pizzas.filter((pizza: { Name: string }) => {
        return pizza.Name.toLowerCase().includes(name.toLowerCase())
    })

    const [price, setPrice] = React.useState<number[]>([0,1000]);

    const minDistance = 30;

    const handleChange = (event: Event, newValue: number | number[], activeThumb: number) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setPrice([Math.min(newValue[0], price[1] - minDistance), price[1]]);
        } else {
            setPrice([price[0], Math.max(newValue[1], price[0] + minDistance)]);
        }
    };

    const marks = [
        {
            value: 0,
            label: '0 Р',
        },
        {
            value: 500,
            label: '500 Р',
        },
        {
            value: 1000,
            label: '1000 Р',
        },
    ];

    function valuetext(price: number) {
        return `${price} Р`;
    }


    return (
        <div>
            <Navbar/>
            <div className="bg-gray-100 min-h-screen ">
                <div className="flex pt-5 place-content-center">
                    <form>
                        <input
                            type="text"
                            className="block w-full px-4 py-2 text-gray-500 text-2xl bg-white border rounded-full focus:border-gray-400 focus:ring-gray-400 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder="Поиск..."
                            onChange={(event) => setName(event.target.value)}
                        />
                    </form>
                </div>
                <div className="flex pt-5 place-content-center">
                    <Box sx={{ width: 300 }}>
                        <Slider
                            getAriaLabel={() => 'Price filter'}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                            value={price}
                            marks={marks}
                            onChange={handleChange}
                            disableSwap
                            step={50}
                            min={0}
                            max={1000}
                        />
                    </Box>
                </div>
                <div className="container mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2 mx-auto">
                    {filteredPizzas.filter((pizza: { Price: number; }) => pizza.Price >= price[0] && pizza.Price <= price[1]).map((pizza: IPizza, key: any) => {
                        return (
                            <MyContext.Provider value={pizza} key={key}>
                                <Pizza/>
                            </MyContext.Provider>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}