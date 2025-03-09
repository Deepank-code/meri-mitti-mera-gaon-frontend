import { useSelector } from "react-redux";
import { useCouponQuery, useDeleteCodeMutation } from "../../redux/api/payment";
import { UserReducerInitalStateType } from "../../types/reducer-type";
import toast from "react-hot-toast";
import { Skleton } from "../../Components/Loader";
import { Link, useNavigate } from "react-router-dom";
import { responseToast } from "../../utils/feature";
import AdminSideBar from "../../Components/AdminSideBar";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";

const Discount = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitalStateType }) => state.userReducer
  );
  const navigate = useNavigate();
  const { data, isLoading, isError } = useCouponQuery(user?._id);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteCouponCode] = useDeleteCodeMutation();
  if (isError) {
    toast.error("Can't fetch products");
  }
  const deleteHandler = async (id: number) => {
    setDeleteLoading(true);
    const res = await deleteCouponCode({
      userId: user!._id,
      discountId: id,
    });
    responseToast(res, navigate, "/admin/coupon");
    setDeleteLoading(false);
  };
  return (
    <div className="adminContainer">
      {/* sidebar */}
      <AdminSideBar />
      <main>
        {isLoading ? (
          <Skleton count={3} />
        ) : JSON.stringify(data?.allCoupon) == JSON.stringify([]) ? (
          <h1
            style={{
              textAlign: "center",
              fontWeight: 100,
              letterSpacing: "5px",
              marginTop: "3em",
            }}
          >
            You have not added any discount coupons
          </h1>
        ) : (
          data?.allCoupon.map((i: any) => {
            return (
              <div className="coupon">
                <span>Id: {i._id}</span>{" "}
                <div className="coupon-info">
                  <span className="coupon-code">Code: {i.coupon}</span>
                  <span className="coupon-expiry">Expiry: No expiry</span>
                </div>
                <span className="coupon-discount">Amount: {i.amount}</span>
                <button
                  className="btn"
                  disabled={deleteLoading}
                  onClick={() => deleteHandler(i._id)}
                >
                  Delete
                </button>
              </div>
            );
          })
        )}
      </main>
      <Link className="create-product-btn" to="/admin/create-coupon">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Discount;
