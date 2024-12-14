import { BsSearch } from "react-icons/bs";
import AdminSideBar from "../../Components/AdminSideBar";
import { FaRegBell } from "react-icons/fa";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import data from "../../assets/data.json";
import { Chart } from "chart.js";
import { BarChart, DoughnutChart } from "../../Components/Charts";
import { BiMaleFemale } from "react-icons/bi";
import Table from "../../Components/DashboardTable";
import quotes from "../../assets/quotes";
import { useEffect, useState } from "react";

const greetTime = (): string => {
  const time = new Date();
  let currTime = time.getHours();

  if (currTime >= 1 && currTime <= 12) {
    return "Good Morning 🌄";
  } else if (currTime >= 13 && currTime <= 17) {
    return "Good AfterNoon ☀️";
  } else if (currTime >= 18 && currTime <= 22) {
    return "Good Evening 🌆";
  } else {
    return "Good Night 🌑";
  }
};

const Dashboard = () => {
  const [randomQuote, setRandomQuote] = useState<string>("hello");
  useEffect(() => {
    setRandomQuote(quotes[Math.floor(Math.random() * 15 + 1)]);
  }, []);

  return (
    <div className="adminContainer">
      {/* sidebar */}
      <AdminSideBar />
      <main className="dashboard">
        <div className="bar">
          <BsSearch />
          <input type="text" placeholder="Search for data,users" />
          <FaRegBell />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgF2suM5kFwk9AdFjesEr8EP1qcyUvah8G7w&s"
            alt="user"
          />
        </div>

        <section className="greeting-section">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgF2suM5kFwk9AdFjesEr8EP1qcyUvah8G7w&s"
            alt="se"
          />
          <div>
            <h1>Hey Deepank! {greetTime()}</h1>
            <p>{randomQuote}</p>
          </div>
        </section>
        <section className="widgetcontainer">
          <WidgetItem
            heading="Revenue"
            percent={40}
            amount={true}
            value={30000}
            color="rgb(0 115 225)"
          />
          <WidgetItem
            heading="Users"
            percent={-40}
            amount={true}
            value={6000}
            color="rgb(0 198 202)"
          />
          <WidgetItem
            heading="Transaction"
            percent={80}
            amount={false}
            value={30000}
            color="rgb(225 96 0)"
          />
          <WidgetItem
            heading="Products"
            percent={80}
            amount={false}
            value={30000}
            color="rgb(76 0 255)"
          />
        </section>
        <section className="graph-container">
          <div className="revenue-chart">
            <h2>Revenue & transaction</h2>
            <BarChart
              data_1={[434, 345, 344, 522, 345]}
              data_2={[343, 234, 211, 452, 241, 341]}
              title_1="Revenue"
              title_2="transaction"
              bgColor_1="rgb(0,115,255"
              bgColor_2="rgba(53,162,235,0.8)"
            />
          </div>
          <div className="dashboard-categories">
            <h2>Inventory </h2>
            <div>
              {data.categories.map((i) => (
                <CategoryItem
                  key={i.heading}
                  heading={i.heading}
                  value={i.value}
                  color={`hsl(${i.value * 5},${i.value * 7}%,50%)`}
                  // color={`hsl(55,40%,50%)`}
                />
              ))}
            </div>
          </div>
        </section>
        <section className="transaction-container">
          <div className="gender-chart">
            <h2>Gender Ratio</h2>
            <DoughnutChart
              labels={["Male", "Female"]}
              data={[23, 19]}
              backgroundColor={[
                "hsl(340,82%,56%)",
                "hsl(82.91457286432161, 85.40772532188842%, 54.313725490196084%)",
              ]}
              cutout={90}
            />
            <p>
              <BiMaleFemale />
            </p>
          </div>
          <Table data={data.transaction} />
        </section>
      </main>
    </div>
  );
};
interface WidgetPropsType {
  heading: string;
  value: number;
  percent: number;
  color: string;
  amount?: boolean;
}
const WidgetItem = ({
  heading,
  value,
  percent,
  color,
  amount = false,
}: WidgetPropsType) => {
  return (
    <article className="widget">
      <div className="widgetInfo">
        <p>{heading}</p>
        <h4>{amount ? `$${value}` : value}</h4>
        {percent > 0 ? (
          <span className="green">
            <HiTrendingUp />+{percent}%
          </span>
        ) : (
          <span className="red">
            <HiTrendingDown />
            {percent}%
          </span>
        )}
      </div>
      <div
        className="widgitCircle"
        style={{
          backgroundImage: `conic-gradient(${color} ${Math.abs(
            (percent / 100) * 320
          )}deg,rgb(255,255,255) 0)`,
        }}
      >
        <span style={{ color }}>{percent}%</span>
      </div>
    </article>
  );
};
interface categoryItemProps {
  color: string;
  value: number;
  heading: string;
}
const CategoryItem = ({ color, value, heading }: categoryItemProps) => {
  return (
    <div className="category-item">
      <h5>{heading}</h5>
      <div>
        <div style={{ backgroundColor: color, width: `${value}%` }}></div>
      </div>
      <span>{value}</span>
    </div>
  );
};
export default Dashboard;
