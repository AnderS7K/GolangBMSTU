import {ENDPOINT} from "./App";
import axios from "axios";


export function getJson(url: string) {
     return axios.get(`${ENDPOINT}/${url}`).then(r => r.data)
}



export function getToken() {
    let tokens = document.cookie.split(' ')
    let access_token = ''
    for (var i = 0; i < tokens.length; i++) {
        if (tokens[i].startsWith("access_token=")) {
            access_token = tokens[i].replace("access_token=", "")
        }
    }
    return access_token.replace(";", "")
}

export function getRole(token: string) {
    return axios.get(`${ENDPOINT}/role`, {withCredentials: true, headers: {
            "Authorization": `Bearer ${token}`
        }}).then(r => r.data)
}

export function updateStatus(token: string, uuid: string, status: string | undefined) {
    const body = { Status: status }
    return axios.put(`${ENDPOINT}/orders/${uuid}`, body,{withCredentials: true, headers: {
            "Authorization": `Bearer ${token}`
        }}).then(r => r.data)
}


export function deleteCart (url: string) {
    let access_token = getToken()
    return axios.delete(`${ENDPOINT}/${url}`, {withCredentials: true, headers: {
            "Authorization": `Bearer ${access_token}`
        }}).then(r => r.data)
}

export function deletePizza (url: string, uuid: string) {
    let access_token = getToken()
    return axios.delete(`${ENDPOINT}/${url}/${uuid}`, {withCredentials: true, headers: {
            "Authorization": `Bearer ${access_token}`
        }}).then(r => r.data)
}

export function addToCart (url: string, uuid: string)  {
    const body = { Pizza: uuid }
    let access_token = getToken()
    return  axios.post(`${ENDPOINT}/${url}`, body, {withCredentials: true, headers: {
            "Authorization": `Bearer ${access_token}`
        }}).then(function (response) {
        console.log(response);
    })

}

export function addOrder (url: string, pizzas_uuid: string[])  {
    const body = { Pizzas: pizzas_uuid }
    let access_token = getToken()
    return  axios.post(`${ENDPOINT}/${url}`, body, {withCredentials: true, headers: {
            "Authorization": `Bearer ${access_token}`
        }}).then(function (response) {
        console.log(response);
    })

}

export function addPizza(url: string, name: string, price: number, description: string, image: string)  {
    const body = {
        Name: name,
        Price: price,
        Description: description,
        Image: image,
    }
    let access_token = getToken()
    console.log(body)
    return  axios.post(`${ENDPOINT}/${url}`, body, {withCredentials: true, headers: {
            "Authorization": `Bearer ${access_token}`
        }}).then(function (response) {
        console.log(response);
    })

}

export function changePizza(uuid: string, url: string, name: string, price: number, description: string, image: string)  {
    const body = {
        Name: name,
        Price: price,
        Description: description,
        Image: image,
    }
    let access_token = getToken()
    return  axios.put(`${ENDPOINT}/${url}/${uuid}`, body, {withCredentials: true, headers: {
            "Authorization": `Bearer ${access_token}`
        }}).then(function (response) {
        console.log(response);
    })

}


export function createUser (url: string, name: string, pass: string)  {
    const body = { name: name, pass: pass }
    return  axios.post(`${ENDPOINT}/${url}`, body).then(function (response) {
        console.log(response);
    })

}

export function loginUser (url: string, name: string, pass: string)  {
    const body = { login: name, password: pass }

    return  axios.post(`${ENDPOINT}/${url}`, body, { withCredentials: true }).then(function (response) {
        window.location.replace('/pizzas')
    }).catch(error => {
        window.location.replace('/login')
    })

}

export function logoutUser (url: string) {
    let access_token = getToken()
    return axios.get(`${ENDPOINT}/${url}`, {withCredentials: true, headers: {
        "Authorization": `Bearer ${access_token}`
    }}).then(function (response) {
        window.location.replace('/login')
    })
}