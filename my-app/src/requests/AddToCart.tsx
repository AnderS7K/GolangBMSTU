import {addToCart} from "../modules";

export function AddToCart(uuid: string) {

    const url = `cart`

    function Add() {
        addToCart(url, uuid)
    }


    return (
        <>
            <button onClick={() => Add()}>Добавить в корзину</button>
        </>
    );

}