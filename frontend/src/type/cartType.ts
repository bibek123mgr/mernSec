export interface cart{
    id: string,
    quantity: number,
    createdAt: string
    Product:product 
}

interface product{
    id: string,
    productName: string,
    productImage: string,
    productPrice: number,
    productDescription:string
}

export interface AddCartType{
    productId: string,
    quantity:number
}


