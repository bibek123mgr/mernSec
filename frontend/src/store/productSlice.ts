import { Product, singleProd } from './../type/productType';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../type/Type";
import { ProductState } from "../type/productType";
import { API } from '../global/http/Index';
import { AppDispatch } from './store';


const initialState: ProductState = {
    product:[],
    status: STATUSES.IDLE,
    singleProduct:null

    
}

const productSlice = createSlice({
    name: 'prod',
    initialState,
    reducers: {
        setProduct(state: ProductState,action: PayloadAction<Product[]>) {
         state.product=action.payload
        },
        setStatus(state: ProductState, action: PayloadAction<STATUSES>) {
            state.status=action.payload
        },
        setSingleProduct(state: ProductState, action: PayloadAction<singleProd>) {
            state.singleProduct=action.payload
        }, 
        resetStatus(state: ProductState) {
            state.status = STATUSES.IDLE
        },
    }
})

export const {setProduct,setStatus,resetStatus,setSingleProduct}=productSlice.actions
export default productSlice.reducer

export function fetchAllProducts() {
    return async function fetchAllProductsThunk(dispatch: AppDispatch) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await API.get('api/products')
            dispatch(setProduct(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

export function fetchOneProducts(id:string) {
    return async function fetchAllProductsThunk(dispatch: AppDispatch) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await API.get(`api/products/${id}`)
            if(response.status === 200){
            dispatch(setSingleProduct(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS))
            }
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}