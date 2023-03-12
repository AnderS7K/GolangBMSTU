import {Pizza} from "./Pizza";
import {createContext, useEffect, useReducer, useState} from "react";
import React from "react";
import {IPizza} from "../models";
import {pizza_context} from "../context/context";
import {Navbar} from "./Navbar";
import {reducer} from "../requests/GetPizzas";
import axios from "axios";
import {ENDPOINT} from "../App";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

export const MyContext = createContext(pizza_context);

const initialState = {pizzas: []}
const success = "Success"

export function HomePage() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const url = `pizzas`

    const [filter, setFilter] = useState(false);

    const [name, setName] = useState('');
    const handleChangeName = (event: { target: { value: any; }; }) => {
        setName(event.target.value);
    };

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

    useEffect(() => {
        axios.get(`${ENDPOINT}/${url}`, { params:{min_price: 0, max_price: 1000, name: name}}).then(r => r.data).then((result) => {
            dispatch({type: success, pizzas: result})
        })
    }, [])

    let showPizzas = true
    if (state.pizzas.length === 0) {
        showPizzas = false
    }

    useEffect(() => {
        if (filter) {
            axios.get(`${ENDPOINT}/${url}`, { params:{min_price: price[0], max_price: price[1], name: name}}).then(r => r.data).then((result) => {
                dispatch({type: success, pizzas: result})
            })
        } else {
            axios.get(`${ENDPOINT}/${url}`, { params:{min_price: 0, max_price: 1000, name: ""}}).then(r => r.data).then((result) => {
                dispatch({type: success, pizzas: result})
            })
        }
    }, [filter])

    console.log(state.pizzas)

    return (
        <div>
            <Navbar/>
            <div className="bg-gray-100 min-h-screen ">
                <div className="w-1/2 mx-auto">
                    <div className="grid grid-rows-2 grid-cols-2 justify-items-center">
                        <div>
                            <label htmlFor="first-name" className="block text-lg text-center font-medium text-gray-700">
                                Наименование
                            </label>
                            <input
                                type="text"
                                onChange={handleChangeName}
                                value={name}
                                maxLength={30}
                                className="mt-1 block w-64 rounded-md border-gray-300 shadow-sm focus:border-stone-400 focus:ring-stone-400 sm:text-base"
                            />
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
                                    step={25}
                                    min={0}
                                    max={1000}
                                />
                            </Box>
                        </div>
                        <button className="mt-5 col-span-3 border-2 border-slate-300 border-stone-400 rounded-full" onClick={() => {setFilter(!filter)}}> {!filter && <p>Применить фильтр</p>}{filter && <p>Снять фильтр</p>} </button>
                    </div>
                </div>
                <div className="container mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2 mx-auto">
                    {showPizzas &&  state.pizzas.map((pizza: IPizza, key: any) => {
                        return (
                            <MyContext.Provider value={pizza} key={key}>
                                <Pizza/>
                            </MyContext.Provider>
                        )
                    })}
                    {!showPizzas && <h1 className="text-2xl text-center">Пицц нет!</h1>}
                </div>
            </div>
        </div>
    )
}