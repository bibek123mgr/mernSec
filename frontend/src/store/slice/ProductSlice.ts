import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../../global/http/status";

interface product{
    id: string,
    productName: string,
    categoryId: string
    productPrice: number
    productDescription: string,
    productStatus: 'public',
    productStockQty: number,
    productImage:string,
    createdAt: number,
    updatedAt: number,
}
interface products{
    product:product
}

interface initialState{
    data: [products],
    status:STATUSES
}
const productStatuses: initialState = {
    data:{} as products,
    status:STATUSES.LOADING
}



const ProductSlice = createSlice({
    name: 'product',
    initialState <initialState>:{
        data: [],
        status:STATUSES.LOADING
    },
    reducers: {
        setProduct(state: initialState, action: PayloadAction:<product>){
            
        }
    }


})