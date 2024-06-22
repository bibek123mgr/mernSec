import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ORDERSTATUSES, order, orderState, orders, productItems } from "../type/orderType";
import { STATUSES } from "../type/Type";
import { AuthenticatedAPI } from "../global/http/Index";
import { deleteBulkDelete } from "./cartSlice";

const initialState: orderState = {
    orders:[],
    selectOrder:{} as order ,
    status:STATUSES.IDLE
}

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers:{
        setOrders(state: orderState, action: PayloadAction<orders[]>) {
            state.orders=action.payload
        },
        // createOrder(state: orderState, action: PayloadAction<orders[]>) {
        //     state.orders=action.payload
        // },
        setOrder(state: orderState, action: PayloadAction<order>) {
            state.selectOrder = action.payload
        },
        setOrderDetails(state: orderState, action: PayloadAction<productItems[]>) {
            state.selectOrder.items=action.payload
        },
        setStatus(state: orderState, action: PayloadAction<STATUSES>) {
            state.status=action.payload
        },
        reSetStatus(state: orderState) {
            state.status=STATUSES.IDLE
        },
        cancelOrderStatus(state: orderState, action: PayloadAction<string>) {
            const index = state.orders.findIndex((item) => item.id == action.payload)
            if (index != -1) {
                state.orders[index].orderStatus=ORDERSTATUSES.Cancelled
            }
        }
    }
})
export const {setOrders,setStatus,reSetStatus,setOrder,setOrderDetails,cancelOrderStatus}=orderSlice.actions
export default orderSlice.reducer

export function createOrder(data:any) {
    return async function createOrderThunk(dispatch: any) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await AuthenticatedAPI.post('api/orders',data)
            if (response.status === 200) {
                dispatch(setStatus(STATUSES.SUCCESS))
                dispatch(deleteBulkDelete())
            }
        } catch (error) {
                dispatch(setStatus(STATUSES.ERROR))           
        }
    }
}

export function fetchOrders() {
    return async function fetchOrdersThunk(dispatch: any) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await AuthenticatedAPI.get('api/orders')
            if (response.status === 200) {
                dispatch(setOrders(response.data.data))
                dispatch(setStatus(STATUSES.SUCCESS))
            }
        } catch (error) {
                dispatch(setStatus(STATUSES.ERROR))           
        }
    }
}

export function cancelOrder(id:string) {
    return async function cancelOrderThunk(dispatch: any) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await AuthenticatedAPI.patch(`api/orders/cancel/${id}`)
            if (response.status === 200) {
                dispatch(cancelOrderStatus(id))
                dispatch(setStatus(STATUSES.SUCCESS))
            }
        } catch (error) {
                dispatch(setStatus(STATUSES.ERROR))           
        }
    }
}
export function fetchOrderDetails() {
    return async function fetchOrderDetailsThunk(dispatch: any) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await AuthenticatedAPI.get('api/orders')
            if (response.status === 200) {
                dispatch(setOrders(response.data.data))
                dispatch(setStatus(STATUSES.SUCCESS))
            }
        } catch (error) {
                dispatch(setStatus(STATUSES.ERROR))           
        }
    }
}

export function fetchOneOrder(id:string) {
    return async function fetchOneOrderThunk(dispatch: any) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await AuthenticatedAPI.get(`api/orders/${id}`)
            if (response.status === 200) {
                dispatch(setOrder(response.data.data.order))
                dispatch(setOrderDetails(response.data.data.items))
                dispatch(setStatus(STATUSES.SUCCESS))
            }
        } catch (error) {
                dispatch(setStatus(STATUSES.ERROR))           
        }
    }
}