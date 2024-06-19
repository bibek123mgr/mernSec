import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "./store";


export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector:TypedUseSelectorHook<RootState>=useSelector