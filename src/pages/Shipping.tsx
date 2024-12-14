import { ChangeEvent, useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CartReducerInitalStateType } from "../types/reducer-type";

const Shipping = () => {
  const [shippingInfo, setshippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  });
  const { cartItems } = useSelector(
    (state: { cartReducer: CartReducerInitalStateType }) => state.cartReducer
  );
  const navigate = useNavigate();

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setshippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  useEffect(() => {
    if (cartItems.length <= 0) return navigate("/cart");
  });
  return (
    <div className="shipping">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <BiArrowBack />
      </button>

      <form>
        <h1>Shipping Address</h1>
        <input
          type="text"
          placeholder="Address"
          name="address"
          value={shippingInfo.address}
          onChange={changeHandler}
        />

        <input
          type="text"
          placeholder="City"
          name="city"
          value={shippingInfo.city}
          onChange={changeHandler}
        />

        <input
          type="text"
          placeholder="State"
          name="state"
          value={shippingInfo.state}
          onChange={changeHandler}
        />
        <select
          name="country"
          id="country"
          value={shippingInfo.country}
          onChange={changeHandler}
        >
          <option value={"india"}>India</option>
          <option value={"bng"}>Bangladesh</option>
          <option value={"pak"}>Pakistan</option>
        </select>
        <input
          type="Number"
          placeholder="Pin Code"
          name="pinCode"
          value={shippingInfo.pinCode}
          onChange={changeHandler}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Shipping;
