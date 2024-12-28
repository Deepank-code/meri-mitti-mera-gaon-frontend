import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import AdminSideBar from "../../../Components/AdminSideBar";
import { OrderItemType } from "../../../types";

import {
  useDeleteOrderMutation,
  useOrdersDetailsQuery,
  useUpdateOrderMutation,
} from "../../../redux/api/orderApi";
import { RootState } from "../../../redux/store";
import { Skleton } from "../../../Components/Loader";
import { responseToast } from "../../../utils/feature";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const orderItems: any[] = [];
const defaultData = {
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: 0,
  },
  status: "",
  subTotal: 0,
  discount: 0,
  shippingCharges: 0,
  tax: 0,
  total: 0,
  orderItems: [],
  user: {
    name: "",
    _id: "",
  },
  _id: "",
};
const Transactionmanagement = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.userReducer);
  const { isLoading, data, isError } = useOrdersDetailsQuery(params.id!);

  const {
    shippingInfo: { address, city, state, country, pinCode },
    orderItems,
    user: { name },
    status,
    total,
    subTotal,
    discount,
    tax,
    shippingCharges,
  } = data?.order || defaultData;

  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const updateHandler = async () => {
    const res = await updateOrder({
      userId: user!._id,
      orderId: data!.order._id,
    });
    responseToast(res, navigate, "/admin/transaction");
  };
  const deleteHandler = async () => {
    const res = await deleteOrder({
      userId: user!._id,
      orderId: data!.order._id,
    });
    responseToast(res, navigate, "/admin/transaction");
  };
  if (isError) {
    <Navigate to={`/404`} />;
  }
  return (
    <div className="adminContainer">
      {/* sidebar */}
      <AdminSideBar />
      <main className="product-management">
        {isLoading ? (
          <Skleton />
        ) : (
          <>
            <section>
              <h2>Order Items</h2>

              {orderItems.map((i) => (
                <ProductCard
                  key={i.productId}
                  name={i.name}
                  photo={i.photo}
                  _id={i.productId}
                  quantity={i.quantity}
                  price={i.price}
                />
              ))}
            </section>
            <article className="shipping-info-card">
              <button
                className="transaction-delete-btn"
                onClick={deleteHandler}
              >
                <FaTrash />
              </button>
              <h1>Order Info</h1>
              <h5>User Info</h5>
              <p>Name: {name}</p>
              <p>
                Address: {`${address},${city},${state},${country},${pinCode}`}{" "}
              </p>

              <h5>Amount Info</h5>
              <p>SubTotal: {subTotal}</p>
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
              <button className="process-status-btn" onClick={updateHandler}>
                Process Status
              </button>
            </article>
          </>
        )}
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
