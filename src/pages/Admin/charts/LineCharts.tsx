import AdminSideBar from "../../../Components/AdminSideBar";
import { LineChart } from "../../../Components/Charts";
const months = ["january", "february", "march", "april", "may", "june", "july"];
const LineCharts = () => {
  return (
    <div className="adminContainer">
      {/* sidebar */}
      <AdminSideBar />
      <main className="chart-container">
        <h1>Bar Charts</h1>
        <section>
          <LineChart
            data={[345, 234, 33, 222, 110, 234]}
            label="Users"
            borderColor="rgb(53,162,255)"
            bgColor={`rgba(53,162,255,0.5)`}
            labels={months}
          />
          <h2>Total Products</h2>
        </section>
        <section>
          <LineChart
            data={[345, 234, 33, 222, 110, 234]}
            label="products"
            borderColor="rgb(53,162,255)"
            bgColor={`rgba(53,162,255,0.5)`}
            labels={months}
          />
          <h2>Total Products</h2>
        </section>
        <section>
          <LineChart
            data={[345, 234, 33, 222, 110, 234]}
            label="Discounts"
            borderColor="rgb(127, 255, 53)"
            bgColor={`rgba(181, 255, 171, 0.5)`}
            labels={months}
          />
          <h2>Total Products</h2>
        </section>
      </main>
    </div>
  );
};

export default LineCharts;
