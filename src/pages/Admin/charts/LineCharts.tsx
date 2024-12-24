import { useSelector } from "react-redux";
import AdminSideBar from "../../../Components/AdminSideBar";
import { LineChart } from "../../../Components/Charts";
import { RootState } from "../../../redux/store";
import { useLineQuery } from "../../../redux/api/dashboardApi";
import toast from "react-hot-toast";
import { CustomError } from "../../../types/api-types";
import { Skleton } from "../../../Components/Loader";
import { getLastMonth } from "../../../utils/feature";

const { last12Months } = getLastMonth();
const LineCharts = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { isLoading, data, isError, error } = useLineQuery(user._id);
  const products = data?.charts.products || [];
  const discount = data?.charts.discount || [];

  const revenue = data?.charts.revenue || [];

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }
  return (
    <div className="adminContainer">
      {/* sidebar */}
      <AdminSideBar />
      <main className="chart-container">
        <h1>Bar Charts</h1>
        {isLoading ? (
          <Skleton count={20} />
        ) : (
          <>
            <section>
              <LineChart
                data={products}
                label="Products"
                borderColor="rgb(53,162,255)"
                bgColor={`rgba(53,162,255,0.5)`}
                labels={last12Months}
              />
              <h2>Total Products</h2>
            </section>
            <section>
              <LineChart
                data={revenue}
                label="Revenue"
                borderColor="rgb(53,162,255)"
                bgColor={`rgba(53,162,255,0.5)`}
                labels={last12Months}
              />
              <h2>Total Revenue</h2>
            </section>
            <section>
              <LineChart
                data={discount}
                label="Discounts"
                borderColor="rgb(127, 255, 53)"
                bgColor={`rgba(181, 255, 171, 0.5)`}
                labels={last12Months}
              />
              <h2>Discount Allocated</h2>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default LineCharts;
