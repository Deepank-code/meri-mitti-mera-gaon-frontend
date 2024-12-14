import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CartReducerInitalStateType } from "../types/reducer-type";

import { CartItem as CartItemProp } from "../types/types";
import {
  addToCart,
  calculatePrice,
  discountApplied,
  removeCartItems,
} from "../redux/reducer/cartReducer";
import toast from "react-hot-toast";
import axios from "axios";

const Cart = () => {
  const { cartItems, subTotal, tax, total, shippingCharges, discount } =
    useSelector(
      (state: { cartReducer: CartReducerInitalStateType }) => state.cartReducer
    );
  const dispatch = useDispatch();
  const incrementHandler = (cartItem: CartItemProp) => {
    if (cartItem.quantity >= cartItem.stock) return;
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };
  const decrementHandler = (cartItem: CartItemProp) => {
    if (cartItem.quantity <= 1) return;
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };
  const deleteHandler = (productId: string) => {
    dispatch(removeCartItems(productId));
  };

  const [couponCode, setCoupnCode] = useState<string>();
  const [isvalidCouponCode, setvalidCouponCode] = useState<boolean>();
  useEffect(() => {
    const { token: cancelToken, cancel } = axios.CancelToken.source();
    const timeOutId = setTimeout(() => {
      axios
        .get(
          `http://localhost:8000/api/v1/payment/discount?coupon=${couponCode}`,
          {
            cancelToken,
          }
        )
        .then((res) => {
          dispatch(discountApplied(res.data.discount));
          setvalidCouponCode(true);
          dispatch(calculatePrice());
        })
        .catch(() => {
          dispatch(discountApplied(0));
          setvalidCouponCode(false);
          dispatch(calculatePrice());
        });
    }, 1000);
    return () => {
      clearTimeout(timeOutId);
      cancel();
      setvalidCouponCode(false);
    };
  }, [couponCode]);
  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems]);
  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i, id) => (
            <CartItem
              key={id}
              cartItem={i}
              deleteHandler={deleteHandler}
              incrementHandler={incrementHandler}
              decrementHandler={decrementHandler}
            />
          ))
        ) : (
          <h1>No Items added</h1>
        )}
      </main>
      <aside>
        <p>SubTotal: ₹{subTotal}</p>
        <p>Shipping charges: ₹{shippingCharges}</p>
        <p>Tax: ₹{tax}</p>
        <p>
          Discount -<em>{discount}</em>
        </p>
        <p>
          <b>Total: {total}</b>
        </p>
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCoupnCode(e.target.value)}
        />

        {couponCode &&
          (isvalidCouponCode ? (
            <span className="green">
              {discount} off using the <code>{couponCode}</code>
            </span>
          ) : (
            <span className="red">
              you have entered invalid Coupon code <VscError />
            </span>
          ))}
        {cartItems.length > 0 && <Link to="/shipping">CheckOut</Link>}
      </aside>
    </div>
  );
};

export default Cart;
