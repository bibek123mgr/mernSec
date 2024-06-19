import React from "react";
import ProductCart from "./component/ProductCart";
import { useAppSelector } from "../../store/hook";

const Product: React.FC = () => {
  const { product } = useAppSelector((store) => store.product);

  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
      <h1 className="text-4xl py-4 text-center">Products</h1>
      <hr />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-6">
        {product &&
          product.map((item) => <ProductCart product={item} key={item.id} />)}
      </div>
    </div>
  );
};

export default Product;
