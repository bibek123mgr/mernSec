import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../../global/http/status";
import { API } from "../../global/http/AxiosConfig";


interface LoginData{
    email: string;
    password: string;
}
interface registerData extends LoginData{
    username: string;
}

interface User extends registerData {
    id: string;
    role: string;
}

interface Data {
    user: User;
    token: string;
}

interface AuthState {
    data: Data;
    status: STATUSES;
}
const initialState:AuthState = {
    data: {} as Data,
    status: STATUSES.LOADING
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState:initialState,
    reducers: {
        setUser(state: AuthState, action: PayloadAction<User>) {
            state.data.user=action.payload
        },
        setStatus(state: AuthState, action: PayloadAction<STATUSES>) {
            state.status=action.payload
        },
        setToken(state: AuthState, action: PayloadAction<string>) {
            state.data.token = action.payload;
        }
    }
})
export const {setUser,setStatus,setToken}=AuthSlice.actions
export default AuthSlice.reducer

export function registerUser(data:registerData){
    return async function userRegisterThunk(dispatch:any) {
        dispatch(setStatus(STATUSES.LOADING))
       try {
           const response = await API.post(`auth/registerUser`,data)
           const resData:Data=response.data.data
        //    dispatch(setUser(resData.user))
           //    dispatch(setToken(resData.token))
           console.log(resData)
           dispatch(setStatus(STATUSES.SUCCESS))
       } catch (error) {
        dispatch(setStatus(STATUSES.ERROR))
       }
   }
}

export function loginUser(data:LoginData) {
    return async function loginUserThunk(dispatch:any) {
        setStatus(dispatch(STATUSES.LOADING))
        try {
            let response = await API.post(`auth/login`, data)
            const resData: Data = await response.data.data
                       console.log(resData)

        //    dispatch(setUser(resData.user))
        //    dispatch(setToken(resData.token))
        setStatus(dispatch(STATUSES.SUCCESS))
        } catch (error) {
        setStatus(dispatch(STATUSES.LOADING))

        }
    }
}