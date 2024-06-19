import { useEffect } from "react";
import Crousel from "../../global/components/Crousel";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { fetchAllProducts, resetStatus } from "../../store/productSlice";
import Product from "../product/Product";
import { STATUSES } from "../../type/Type";
const Home = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((store) => store.product);
  const fetchProduct = () => {
    dispatch(fetchAllProducts());
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  useEffect(() => {
    if (status !== STATUSES.IDLE) {
      dispatch(resetStatus());
    }
  }, [status, dispatch]);
  return (
    <div>
      <Crousel />
      <Product />
    </div>
  );
};

export default Home;
