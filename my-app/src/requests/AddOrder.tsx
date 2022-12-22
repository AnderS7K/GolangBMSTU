import {addOrder} from "../modules";

export function AddOrder(pizzas_uuid: string[]) {

    const url = `orders`

    function Add() {
        addOrder(url, pizzas_uuid)
    }


    return (
        <>
            <button className="rounded-full bg-transparent hover:bg-stone-500 text-stone-700 font-semibold hover:text-white py-2 px-4 border border-stone-500 hover:border-transparent rounded" onClick={() => Add()}>Приобрести</button>
        </>
    );

}