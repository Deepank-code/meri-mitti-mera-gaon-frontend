import { FaBasketShopping } from "react-icons/fa6";
import "./ProductCard.css";

import { BiHeart } from "react-icons/bi";
import { CartItem } from "../../types/types";

type ProductPropType = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: (cartItem: CartItem) => string | undefined;
};

const ProductCard = ({
  productId,
  photo,
  name,
  price,
  stock,
  handler,
}: ProductPropType) => {
  return (
    <div className="productCard">
      <img
        src={`${import.meta.env.VITE_SERVER}${photo}`}
        width="200px"
        alt="meal.name"
      />

      <p>{name}</p>

      <span id="stock-span">{stock}</span>

      <span>₹ {price}</span>

      <button
        onClick={() =>
          handler({ productId, photo, name, price, stock, quantity: 1 })
        }
      >
        Add To Cart <FaBasketShopping />
      </button>
      <span id="heart">
        <BiHeart size={28} />
      </span>
    </div>
  );
};

export default ProductCard;
