import React, {useState} from 'react';
import {LoginUser} from "../requests/LoginUser";


export function Login() {
    const [name, setName] = useState('');

    const handleChangeName = (event: { target: { value: any; }; }) => {
        setName(event.target.value);

    };
    const [pass, setPass] = useState('');

    const handleChangePass = (event: { target: { value: any; }; }) => {
        setPass(event.target.value);
    };
    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-stone-700">
                    Войти
                </h1>
                <form className="mt-6">
                    <div className="mb-2">
                        <label
                            htmlFor="login"
                            className="block text-sm font-semibold text-stone-800"
                        >
                            Login
                        </label>
                        <input
                            type="text"
                            onChange={handleChangeName}
                            value={name}
                            className="block w-full px-4 py-2 mt-2 text-stone-700 bg-white border rounded-md focus:border-stone-400 focus:ring-stone-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-stone-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            onChange={handleChangePass}
                            value={pass}
                            className="block w-full px-4 py-2 mt-2 text-stone-700 bg-white border rounded-md focus:border-stone-400 focus:ring-stone-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>

                </form>
                <div className="mt-6">
                    {LoginUser(name, pass)}
                </div>
                <p className="mt-8 text-xl font-light text-center text-stone-700">
                    {" "}
                    Отсутствует аккаунт?{" "}
                    <a
                        href="/registration"
                        className="font-medium text-stone-600 text-xl hover:underline"
                    >
                        Зарегестрироваться
                    </a>
                </p>
            </div>
        </div>
    );
}