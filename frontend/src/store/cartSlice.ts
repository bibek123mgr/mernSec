import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AddCartType, cart } from "../type/cartType";
import { STATUSES } from "../type/Type";
import { AuthenticatedAPI } from "../global/http/Index";

interface CartState {
    data: cart[];
    status: STATUSES;
}

const initialState: CartState = {
    data: [],
    status: STATUSES.IDLE
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart(state:CartState, action: PayloadAction<cart[]>) {
            state.data = action.payload;
        },
        setStatus(state:CartState, action: PayloadAction<STATUSES>) {
            state.status = action.payload;
        },
        resetStatus(state: CartState) {
            state.status = STATUSES.IDLE
        },
        addToCart(state: CartState, action: PayloadAction<cart>) {
            const index = state.data.findIndex(item => item.Product.id === action.payload.Product.id)
            if(index !== -1){
                state.data[index].quantity = action.payload.quantity
            } else {
            state.data.push(action.payload)
            }
        },
        updateCartQty(state: CartState, action: PayloadAction<any>) {
            const index = state.data.findIndex(item => item.id === action.payload.cartId)
            if(index !== -1){
                state.data[index].quantity =action.payload.quantity;
            }
        },
        deleteItem(state: CartState, action: PayloadAction<any>) {
            const index = state.data.findIndex(item => item.id == action.payload)
            if(index !== -1){
                state.data.splice(index, 1)
            }
        }
    }
});

export const { setCart, setStatus,resetStatus,addToCart,updateCartQty,deleteItem} = cartSlice.actions;

export default cartSlice.reducer;



export function fetchAllCart() {
    return async function fetchAllCartThunk(dispatch: any) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await AuthenticatedAPI.get('api/carts')
            if (response.status === 200) {
                dispatch(setCart(response.data.data))
            }
        } catch (error) {
        dispatch(setStatus(STATUSES.ERROR))  
        }
    }
}

export function AddProductToCart(data:AddCartType) {
    return async function AddProductToCartThunk(dispatch: any) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await AuthenticatedAPI.post('api/carts',data)
            if (response.status === 201) {
                dispatch(addToCart(response.data.data))
            }
        } catch (error) {
        dispatch(setStatus(STATUSES.ERROR))  
        }
    }
}

export function updateCart(cartId:string,quantity:number) {
    return async function updateCartThunk(dispatch: any) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await AuthenticatedAPI.patch(`api/carts/${cartId}`,{quantity:quantity})
            if (response.status === 200) {
                dispatch(updateCartQty({cartId,quantity}))
            }
        } catch (error) {
        dispatch(setStatus(STATUSES.ERROR))  
        }
    }
}

export function deleteCartItem(cartId: string) {
    return async function deleteCartItemThunk(dispatch: any) {
        try {
            const response = await AuthenticatedAPI.delete(`api/carts/${cartId}`)
            if (response.status === 200) {
                dispatch(deleteItem(cartId))
            }

        } catch (error) {
        dispatch(setStatus(STATUSES.ERROR))    
        }
    }
}