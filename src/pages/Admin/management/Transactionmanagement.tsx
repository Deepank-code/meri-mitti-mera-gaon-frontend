import { useState } from "react";
import AdminSideBar from "../../../Components/AdminSideBar";
import { OrderItemType, OrderType } from "../../../types";
import { Link } from "react-router-dom";

const img =
  "https://5.imimg.com/data5/EP/YS/MY-3966004/lady-fingers-500x500.jpg";
const orderItems: OrderItemType[] = [
  {
    name: "lady finger",
    photo: img,
    _id: "dfsfwdf",
    quantity: 4,
    price: 2000,
  },
];
const Transactionmanagement = () => {
  const [order, setOrder] = useState<OrderType>({
    name: "deepank",
    address: "amba bhawan ",
    city: "pithoragarh",
    state: "uttarakhand",
    country: "india",
    pinCode: 343665,
    status: "Processing",
    subtotal: 4000,
    discount: 120,
    shippingCharges: 0,
    tax: 0,
    total: 322245,
    orderItems,
    _id: "erfwefrwef",
  });

  const {
    name,
    address,
    city,
    country,
    state,
    pinCode,
    subtotal,
    shippingCharges,
    tax,
    discount,
    total,
    status,
  } = order;
  const updateHandler = () => {
    setOrder((prev) => ({
      ...prev,
      status: prev.status === "Processing" ? "shipped" : "delivered",
    }));
  };
  return (
    <div className="adminContainer">
      {/* sidebar */}
      <AdminSideBar />
      <main className="product-management">
        <section>
          <h2>Order Items</h2>

          {order.orderItems.map((i) => (
            <ProductCard
              name={i.name}
              photo={i.photo}
              _id={i._id}
              quantity={i.quantity}
              price={i.price}
            />
          ))}
        </section>
        <article className="shipping-info-card">
          <h1>Order Info</h1>
          <h5>User Info</h5>
          <p>Name: {name}</p>
          <p>Address: {`${address},${city},${state},${country},${pinCode}`} </p>

          <h5>Amount Info</h5>
          <p>SubTotal: {subtotal}</p>
          <p>Shipping Charges: {shippingCharges}</p>
          <p>Tax: {tax}</p>
          <p>Discount: {discount}</p>
          <p>Total: {total}</p>

          <h5>Status Info</h5>
          <p>
            Status:{" "}
            <span
              className={
                status === "delivered"
                  ? "purple"
                  : status === "shipped"
                  ? "green"
                  : "red"
              }
            >
              {status}
            </span>
          </p>
          <button onClick={updateHandler}>Process Status</button>
        </article>
      </main>
    </div>
  );
};

const ProductCard = ({ name, photo, price, quantity, _id }: OrderItemType) => {
  return (
    <div className="transaction-product-card">
      <img src={photo} alt="mam" />
      <Link to={`/product/${_id}`}>{name}</Link>
      <span>
        {price}X{quantity}={price * quantity}
      </span>
    </div>
  );
};

export default Transactionmanagement;
