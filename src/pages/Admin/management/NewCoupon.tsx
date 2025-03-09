import { FormEvent, useState } from "react";
import AdminSideBar from "../../../Components/AdminSideBar";
import { useCreateCouponMutation } from "../../../redux/api/payment";
import { useSelector } from "react-redux";
import { responseToast } from "../../../utils/feature";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { UserReducerInitalStateType } from "../../../types/reducer-type";

const NewCoupon = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitalStateType }) => state.userReducer
  );
  const [isLoading, setIsLoading] = useState(false);

  const [createCoupon] = useCreateCouponMutation();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const [amount, setAmount] = useState(0);
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!couponCode || !amount) return;

    try {
      const res = await createCoupon({
        userId: user?._id,
        coupon: couponCode,
        amount: amount,
      });
      responseToast(res, navigate, "/admin/coupon");
    } catch (error: any) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="adminContainer">
      {/* sidebar */}
      <AdminSideBar />
      <main className="product-management">
        <article>
          <form onSubmit={submitHandler}>
            <h2>Create coupon</h2>
            <div>
              <label htmlFor="coupon">Coupon Code</label>
              <input
                required
                type="text"
                placeholder="Create your coupon code"
                value={couponCode}
                id="coupon"
                onChange={(e) => setCouponCode(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="amount">Amount</label>
              <input
                required
                type="number"
                placeholder="amount"
                value={amount}
                id="amount"
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>

            <button disabled={isLoading} type="submit">
              Create Coupon
            </button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewCoupon;
