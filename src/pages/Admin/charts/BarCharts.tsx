import AdminSideBar from "../../../Components/AdminSideBar";
import { BarChart } from "../../../Components/Charts";

const BarCharts = () => {
  return (
    <div className="adminContainer">
      {/* sidebar */}
      <AdminSideBar />
      <main className="chart-container">
        <h1>Bar Charts</h1>
        <section>
          <BarChart
            data_1={[345, 234, 33, 222, 110, 234]}
            data_2={[232, 144, 134, 224, 554, 231]}
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
            data_1={[345, 234, 33, 222, 110, 234]}
            data_2={[]}
            title_1="Product"
            title_2=""
            bgColor_1={`hsl(260,50%,30%)`}
            bgColor_2={`hsl(360,90%,90%)`}
          />
        </section>
      </main>
    </div>
  );
};

export default BarCharts;
