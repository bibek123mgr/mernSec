import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { STATUSES, UserLoginType, userDataType } from "../type/Type";
import { API, AuthenticatedAPI } from "../global/http/Index";


interface userData{
        id: string,
        username: string,
        email: string,
        role: string,
        address: string,
        gender: string,
        number:number | null,
}
interface data{
    user: userData,
    token :string
}

interface AuthState{
    data:data
    status:STATUSES
}

const initialState: AuthState={
    data: {} as data,
    status:STATUSES.IDLE
}
const initialUser: userData = {
        id: '',
        username: '',
        email: '',
        role: '',
        address: '',
        gender: '',
        number:null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state: AuthState, action: PayloadAction<userData>) {
            state.data.user = action.payload
        },
        setToken(state: AuthState, action: PayloadAction<string>) {
            state.data.token = action.payload
        },
        setStatus(state: AuthState, action: PayloadAction<STATUSES>) {
            state.status = action.payload
        },
        resetStatus(state: AuthState) {
            state.status = STATUSES.IDLE
        },
        logOut(state: AuthState) {
            state.data.user = initialUser,
                state.data.token = ''
        }
    }
})
export const{setUser,setToken,setStatus,resetStatus,logOut}=authSlice.actions
export default authSlice.reducer


export function login(data: UserLoginType) {
    return async function userLoginThunk(dispatch: any) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await API.post('api/auth/login', data)
            if (response.status === 200) {
                dispatch(setUser(response.data.data.user))
                dispatch(setToken(response.data.data.token))
                dispatch(setStatus(STATUSES.SUCCESS))
                localStorage.setItem("token",response.data.data.token)
            }
        } catch (error) {
        dispatch(setStatus(STATUSES.ERROR))   
        }
    }
}

export function register(data: userDataType) {
    return async function userLoginThunk(dispatch: any) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await API.post('api/auth/register', data)
            if (response.status === 201) {
                dispatch(setUser(response.data.data.user))
                dispatch(setToken(response.data.data.token))
            }
        dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
        dispatch(setStatus(STATUSES.ERROR))   
        }
    }
}

export function fetchMyprofile() {
    return async function fetchMyprofileThunk(dispatch:any) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await AuthenticatedAPI.get('api/profile')
            if (response.status === 200) {
                dispatch(setUser(response.data.data.user))
            }
        dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
        dispatch(setStatus(STATUSES.ERROR))   
        }
    }
}
