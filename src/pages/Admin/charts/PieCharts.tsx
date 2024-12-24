import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import AdminSideBar from "../../../Components/AdminSideBar";
import { DoughnutChart, PieChart } from "../../../Components/Charts";
import { Skleton } from "../../../Components/Loader";
import { categories } from "../../../assets/data.json";
import { usePieQuery } from "../../../redux/api/dashboardApi";
import { RootState } from "../../../redux/store";
const PieCharts = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { isLoading, data, isError } = usePieQuery(user._id);
  if (isError) {
    return <Navigate to={"/admin/dashboard"} />;
  }
  const charts = data?.charts;

  return (
    <div className="adminContainer">
      {/* sidebar */}
      <AdminSideBar />
      {isLoading ? (
        <Skleton count={20} />
      ) : (
        <main className="chart-container">
          <h1>Pie & Doughnut Charts</h1>
          <section>
            <div>
              <PieChart
                labels={["Processing", "Shipped", "delivered"]}
                data={[
                  charts?.orderFullFillment.processing,
                  charts?.orderFullFillment.shipping,
                  charts?.orderFullFillment.delivered,
                ]}
                backgroundColor={categories.map(
                  (i) => `hsl(${i.value * 4},${i.value}%,50%)`
                )}
                legends={false}
                offset={[0, 0, 50]}
              />
            </div>
            <h2>Order fulfillment Ratio</h2>
          </section>
          <section>
            <div>
              <DoughnutChart
                labels={charts?.productCategoriesRatio.map(
                  (i) => Object.keys(i)[0]
                )}
                data={charts?.productCategoriesRatio.map(
                  (i) => Object.values(i)[0]
                )}
                backgroundColor={categories.map(
                  (i) => `hsl(${i.value * 4},${i.value}%,50%)`
                )}
                legends={false}
                offset={[0, 0, 0, 80]}
              />
            </div>
            <h2>Product category Ratio</h2>
          </section>
          <section>
            <div>
              <DoughnutChart
                labels={["In Stock", "out of Stock"]}
                data={[
                  charts?.stockAvailablity.inStock,
                  charts?.stockAvailablity.outOfStock,
                ]}
                backgroundColor={[`hsl(260,80%,40%)`, `hsl(220,70%,45%)`]}
                legends={false}
                offset={[0, 80]}
                cutout={70}
              />
            </div>
            <h2>Stock avaliablity Ratio</h2>
          </section>
          <section>
            <div>
              <DoughnutChart
                labels={[
                  "Marketing Cost",
                  "Discount",
                  "Burnt",
                  "Production Cost",
                  "net Margin",
                ]}
                data={[
                  charts?.revenueDistribution.marketingCost,
                  charts?.revenueDistribution.discount,
                  charts?.revenueDistribution.burnt,
                  charts?.revenueDistribution.productionCost,
                  charts?.revenueDistribution.netMargin,
                ]}
                backgroundColor={[
                  `hsl(260,80%,40%)`,
                  `hsl(220,70%,45%)`,
                  `hsl(150, 83.80%, 63.70%)`,
                  `hsl(152, 67.80%, 40.20%)`,
                  `hsl(85, 70.30%, 44.90%)`,
                ]}
                legends={false}
                offset={[0, 80]}
                cutout={"70%"}
              />
            </div>
            <h2>Stock avaliablity Ratio</h2>
          </section>
          <section>
            <div>
              <DoughnutChart
                labels={["Admin", "Customers"]}
                data={[
                  charts?.adminCustomer.admin,
                  charts?.adminCustomer.customer,
                ]}
                backgroundColor={[`hsl(335,100%,38%)`, `hsl(44,98%,50%)`]}
                offset={[0, 80]}
              />
            </div>
            <h2>Admin - customer Ratio Ratio</h2>
          </section>
          <section>
            <div>
              <DoughnutChart
                labels={["Adult", "Teen", "old"]}
                data={[
                  charts?.userAgeGroup.adult,
                  charts?.userAgeGroup.teen,
                  charts?.userAgeGroup.old,
                ]}
                backgroundColor={[
                  `hsl(335,100%,38%)`,
                  `hsl(44,98%,50%)`,
                  `hsl(119, 97.60%, 50.00%)`,
                ]}
                offset={[0, 80]}
              />
            </div>
            <h2>User Ratio</h2>
          </section>
        </main>
      )}
    </div>
  );
};

export default PieCharts;
