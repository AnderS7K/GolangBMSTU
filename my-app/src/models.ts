export interface IPizza {
    UUID: string
    Name: string
    Price: number
    Description: string
    Image: string
}

export interface ICart {
    UUID: string
    Pizza: string
}


export interface IOrder {
    UUID: string
    Pizzas: string[]
    UserUUID: string
    Date: string
    Status: string
}