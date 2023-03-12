import {useEffect, useReducer} from "react";
import {getJson} from "../modules";

const initialState = {pizzas: []}
const success = "Success"

export function reducer(state: any, action: { type: any; pizzas: any; }) {
    switch (action.type) {
        case success:
            return {
                pizzas: action.pizzas
            }
        default:
            return state
    }
}

export function GetPizzas() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const url = `pizzas`

    useEffect(() => {
        getJson(url).then((result) => {
            dispatch({type: success, pizzas: result})
        })
    }, [url])

    return state.pizzas
}