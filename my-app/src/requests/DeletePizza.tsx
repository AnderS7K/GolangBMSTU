import {deletePizza} from "../modules";


export function DeletePizza(uuid: string) {

    const url = `pizzas`

    function Delete() {
        deletePizza(url, uuid)
    }


    return (
        <form>
            <button onClick={() => Delete()}>Удалить пиццу</button>
        </form>
    );

}