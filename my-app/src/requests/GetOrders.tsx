import {useEffect, useReducer} from "react";
import {getToken} from "../modules";
import axios from "axios";
import {ENDPOINT} from "../App";


const success = "Success"

export function reducer(state: any, action: { type: any; payload: any; }) {
    switch (action.type) {
        case success:
            return {
                order: action.payload
            }
        default:
            return state
    }
}


