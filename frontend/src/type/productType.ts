import { STATUSES } from "./Type";

interface Category{
    id : string, 
    categoryName : string
}
interface user{
    id:string,
    username:string
}

export interface Product{
    id : string, 
    productName : string, 
    productDescription : string, 
    productPrice : number, 
    productStockQty : number; 
    productImage : string, 
    createdAt : string, 
    updatedAt : string,  
    Category : Category, 
}
export interface review{
    id:string
    rating: number,
    comment:string,
    createdAt : string, 
    updatedAt : string,  
    User:user
}
    
export interface singleProd{
    product: Product,
    reviews:review[]
}

export interface ProductState{
    product : Product[],
    status : STATUSES,
    singleProduct : singleProd | null 
}