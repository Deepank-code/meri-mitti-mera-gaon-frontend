import AdminSideBar from "../../../Components/AdminSideBar";
import { DoughnutChart, PieChart } from "../../../Components/Charts";
import { categories } from "../../../assets/data.json";
const PieCharts = () => {
  return (
    <div className="adminContainer">
      {/* sidebar */}
      <AdminSideBar />
      <main className="chart-container">
        <h1>Pie & Doughnut Charts</h1>
        <section>
          <div>
            <PieChart
              labels={["Processing", "Shipped", "delivered"]}
              data={[43, 33, 66]}
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
              labels={categories.map((i) => i.heading)}
              data={categories.map((i) => i.value)}
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
              data={[40, 50]}
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
              labels={["In Stock", "out of Stock"]}
              data={[40, 50]}
              backgroundColor={[`hsl(260,80%,40%)`, `hsl(220,70%,45%)`]}
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
              data={[40, 250]}
              backgroundColor={[`hsl(335,100%,38%)`, `hsl(44,98%,50%)`]}
              offset={[0, 80]}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default PieCharts;
