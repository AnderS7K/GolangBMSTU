import {createUser} from "../modules";
import React from "react";
import {Link} from "react-router-dom";

export function CreateUser(name: string, pass: string) {

    const url = `sign_up`

    function Create() {
        createUser(url, name, pass)
    }


    return (
        <>
            <Link to="/login"
                  className="block w-full text-center px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-stone-700 rounded-md hover:bg-stone-600 focus:outline-none focus:bg-stone-600"
                  onClick={() => Create()}
            >
                Зарегестрироваться
            </Link>
        </>
    );

}