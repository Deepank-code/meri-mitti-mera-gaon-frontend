import { FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";

import { CartItem as CartItemProp } from "../types/types";

type CartItemProps = {
  cartItem: any;
  incrementHandler: (cartItem: CartItemProp) => void;
  decrementHandler: (cartItem: CartItemProp) => void;
  deleteHandler: (id: string) => void;
};

const CartItem = ({
  cartItem,
  incrementHandler,
  decrementHandler,
  deleteHandler,
}: CartItemProps) => {
  const { productId, photo, name, price, quantity } = cartItem;

  return (
    <div className="cart-item">
      <img src={photo} alt="" />
      <article>
        <Link to={`/product/${productId}`}>{name}</Link>
        <span>{price}</span>
      </article>
      <div>
        <button onClick={() => decrementHandler(cartItem)}>-</button>
        <p>{quantity}</p>
        <button onClick={() => incrementHandler(cartItem)}>+</button>
      </div>
      <button onClick={() => deleteHandler(productId)}>
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;
