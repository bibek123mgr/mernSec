import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { Product } from "../../../type/productType";
import { useAppDispatch } from "../../../store/hook";
import { AddProductToCart, resetStatus } from "../../../store/cartSlice";

interface prod {
  product: Product;
}

const ProductCart: React.FC<prod> = ({ product }) => {
  const dispatch = useAppDispatch();
  const handleCartClick = (e: React.MouseEvent, id: string) => {
    const data = {
      productId: id,
      quantity: 1,
    };
    e.stopPropagation();
    e.preventDefault();
    dispatch(AddProductToCart(data));
    dispatch(resetStatus());
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="rounded overflow-hidden shadow-lg flex flex-col h-fit"
    >
      <div className="relative">
        <img
          className="w-full max-h-60 object-contain"
          src={product.productImage}
          alt={product.productName}
        />
        <div className="hover:bg-transparent transition duration-300 absolute inset-0 bg-gray-900 opacity-25"></div>
        <div className="text-sm absolute top-0 right-0 bg-indigo-600 px-4 text-white rounded-full flex items-center justify-center mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out h-auto w-auto py-1 ">
          <small>Rs.{product.productPrice}</small>
        </div>
      </div>
      <div className="px-6 py-4 flex-grow">
        <h2 className="font-semibold text-lg hover:text-indigo-600 transition duration-500 ease-in-out">
          {product.productName}
        </h2>
        <p className="text-gray-500 text-sm">{product.productDescription}</p>
      </div>
      <hr />
      <div className="px-6 py-4 flex flex-row items-center justify-end">
        <button
          className="ml-1"
          onClick={(e) => handleCartClick(e, product.id)}
        >
          <FaCartShopping size={28} />
        </button>
      </div>
    </Link>
  );
};

export default ProductCart;
