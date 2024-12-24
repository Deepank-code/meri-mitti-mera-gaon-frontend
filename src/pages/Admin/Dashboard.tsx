import { BsSearch } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import AdminSideBar from "../../Components/AdminSideBar";

import { useEffect, useState } from "react";
import { BiMaleFemale } from "react-icons/bi";
import { useSelector } from "react-redux";
import quotes from "../../assets/quotes";
import { BarChart, DoughnutChart } from "../../Components/Charts";
import { DashboardTable } from "../../Components/DashboardTable";
import { Skleton } from "../../Components/Loader";
import { useStatsQuery } from "../../redux/api/dashboardApi";
import { RootState } from "../../redux/store";
import { Navigate } from "react-router-dom";

const greetTime = (): string => {
  const time = new Date();
  const currTime = time.getHours();

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

export const userPhoto =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgF2suM5kFwk9AdFjesEr8EP1qcyUvah8G7w&s";
const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { isLoading, data, isError } = useStatsQuery(user?._id);

  const stats = data?.stats;
  const [randomQuote, setRandomQuote] = useState<string>("hello");
  useEffect(() => {
    setRandomQuote(quotes[Math.floor(Math.random() * 15 + 1)]);
  }, []);
  if (isError) {
    return <Navigate to={"/admin/dashboard"} />;
  }
  return (
    <div className="adminContainer">
      {/* sidebar */}
      <AdminSideBar />
      {isLoading ? (
        <Skleton count={20} />
      ) : (
        <main className="dashboard">
          <div className="bar">
            <BsSearch />
            <input type="text" placeholder="Search for data,users" />
            <FaRegBell />
            <img src={user?.photo || userPhoto} alt="user" loading="lazy" />
          </div>

          <section className="greeting-section">
            <img src={user?.photo || userPhoto} alt="se" loading="lazy" />
            <div>
              <h1>Hey Deepank! {greetTime()}</h1>
              <p>{randomQuote}</p>
            </div>
          </section>
          <section className="widgetcontainer">
            <WidgetItem
              heading="Revenue"
              percent={stats?.changePercent.revenue}
              amount={true}
              value={stats?.count.revenue}
              color="rgb(0 115 225)"
            />
            <WidgetItem
              heading="Users"
              percent={stats?.changePercent.user}
              amount={true}
              value={stats?.count.user}
              color="rgb(0 198 202)"
            />
            <WidgetItem
              heading="order"
              percent={stats?.changePercent.order}
              amount={false}
              value={stats?.count.order}
              color="rgb(225 96 0)"
            />
            <WidgetItem
              heading="Products"
              percent={stats?.changePercent.product}
              amount={false}
              value={stats?.count.product}
              color="rgb(76 0 255)"
            />
          </section>
          <section className="graph-container">
            <div className="revenue-chart">
              <h2>Revenue & transaction</h2>
              <BarChart
                data_1={stats?.chart.revenue}
                data_2={stats?.chart.order}
                title_1="Revenue"
                title_2="transaction"
                bgColor_1="rgb(0,115,255"
                bgColor_2="rgba(53,162,235,0.8)"
              />
            </div>
            <div className="dashboard-categories">
              <h2>Inventory </h2>
              <div>
                {stats?.categoryCount.map((i) => {
                  const [heading, value] = Object.entries(i)[0];

                  return (
                    <CategoryItem
                      key={heading}
                      heading={heading}
                      value={value}
                      color={`hsl(${value * 5},${value * 7}%,50%)`}
                      // color={`hsl(55,40%,50%)`}
                    />
                  );
                })}
              </div>
            </div>
          </section>
          <section className="transaction-container">
            <div className="gender-chart">
              <h2>Gender Ratio</h2>
              <DoughnutChart
                labels={["Male", "Female"]}
                data={[stats?.userRatio?.male, stats?.userRatio.female]}
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
            <DashboardTable data={stats?.latestTransaction!} />
          </section>
        </main>
      )}
    </div>
  );
};
interface WidgetPropsType {
  heading: string;
  value: number | undefined;
  percent: number | undefined;
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
        <h4>{amount ? `${value}` : value}</h4>
        {percent > 0 ? (
          <span className="green">
            <HiTrendingUp />+{`${percent > 10000 ? 9999 : percent}`}%
          </span>
        ) : (
          <span className="red">
            <HiTrendingDown />-{`${percent < -10000 ? -9999 : percent}`}%
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
        <span style={{ color }}>
          {percent > 0 && `${percent > 10000 ? 9999 : percent}`}%
          {percent < 0 && `${percent < -10000 ? -9999 : percent}`}%
        </span>
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
