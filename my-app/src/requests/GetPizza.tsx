import {useEffect, useReducer} from "react";
import {getJson} from "../modules";

const initialState = {pizza: ""}
const success = "Success"

function reducer(state: any, action: { type: any; pizza: any; }) {
    switch (action.type) {
        case success:
            return {
                pizza: action.pizza
            }
        default:
            return state
    }
}

export function GetPizza(uuid: string) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const url = `pizzas/${uuid}`

    useEffect(() => {
        getJson(url).then((result) => {
            dispatch({type: success, pizza: result})
        })
    }, [url])

    return state.pizza
}