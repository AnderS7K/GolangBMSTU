import {useEffect, useReducer} from "react";
import {getToken} from "../modules";
import axios from "axios";
import {ENDPOINT} from "../App";

const initialState = {cart: []}
const success = "Success"

function reducer(state: any, action: { type: any; payload: any; }) {
    switch (action.type) {
        case success:
            return {
                cart: action.payload
            }
        default:
            return state
    }
}

export function GetCart() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const url = `cart`
    let access_token = getToken()

    useEffect(() => {
        axios.get(`${ENDPOINT}/${url}`, {withCredentials: true, headers: {
                "Authorization": `Bearer ${access_token}`
            }}).then(r => r.data).then((result) => {
            dispatch({type: success, payload: result})
        })
    }, [url])

    return state.cart
}