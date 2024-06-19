export interface UserLoginType{
    email: string,
    password:string
}

export interface userDataType extends UserLoginType{
     username:string
}
export interface AuthProp{
    page: string;
    onSubmit:(data:userDataType)=>void
}

export enum STATUSES{
    LOADING = 'loading',
    ERROR = 'error',
    SUCCESS = 'success',
    IDLE='idle'
}

