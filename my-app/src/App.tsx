import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import {HomePage} from "./components/HomePage";
import {Info} from "./components/Info";
import {CartPage} from "./components/CartPage";
import {Login} from "./components/LoginPage";
import {Registration} from "./components/RegisterPage";
import {ProfilePage} from "./components/ProfilePage";
import {AddPizza} from "./components/AddPizza";
import {OrderPage} from "./components/OrderPage";
import {ChangePizza} from "./components/ChangePizza";
import {UserOrdersPage} from "./components/UserOrdersPage";
import {PizzaDescription} from "./components/PizzaPage";

export const ENDPOINT = "http://localhost:8080"

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/pizzas" element={<HomePage/>}/>
            <Route path="/description" element={<PizzaDescription/>}/>
            <Route path="/info" element={<Info/>}/>
          <Route path="/cart" element={<CartPage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/registration" element={<Registration/>}/>
          <Route path="/add" element={<AddPizza/>}/>
          <Route path="/change" element={<ChangePizza/>}/>
          <Route path="/profile" element={<ProfilePage/>}></Route>
          <Route path="/orders" element={<OrderPage/>}></Route>
          <Route path="/user_orders" element={<UserOrdersPage/>}></Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App;