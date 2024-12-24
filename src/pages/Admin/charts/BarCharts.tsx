import { useSelector } from "react-redux";
import AdminSideBar from "../../../Components/AdminSideBar";
import { BarChart } from "../../../Components/Charts";
import { RootState } from "../../../redux/store";
import { useBarQuery } from "../../../redux/api/dashboardApi";
import { CustomError } from "../../../types/api-types";
import toast from "react-hot-toast";
import { Skleton } from "../../../Components/Loader";
import { getLastMonth } from "../../../utils/feature";

const { last6Months, last12Months } = getLastMonth();

const BarCharts = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { isLoading, data, isError, error } = useBarQuery(user._id);
  const products = data?.charts.products || [];
  const orders = data?.charts.orders || [];
  const users = data?.charts.users || [];

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
              <BarChart
                data_1={products}
                data_2={users}
                labels={last6Months}
                title_1="Product"
                title_2="User"
                bgColor_1={`hsl(260,50%,30%)`}
                bgColor_2={`hsl(360,90%,90%)`}
              />{" "}
            </section>
            <h2>Top selling Products & top customers</h2>
            <section>
              <BarChart
                horizontal={true}
                data_1={orders}
                data_2={[]}
                labels={last12Months}
                title_1="Product"
                title_2=""
                bgColor_1={`hsl(260,50%,30%)`}
                bgColor_2={`hsl(360,90%,90%)`}
              />
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default BarCharts;
