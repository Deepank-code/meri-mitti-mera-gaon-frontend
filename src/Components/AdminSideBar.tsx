import { useEffect, useState } from "react";
import { AiFillFileText } from "react-icons/ai";
import {
  FaChartBar,
  FaChartLine,
  FaChartPie,
  FaGamepad,
  FaStopwatch,
} from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoIosPeople } from "react-icons/io";
import {
  RiCoupon3Fill,
  RiDashboardFill,
  RiShoppingBag3Fill,
} from "react-icons/ri";
import { NavLink } from "react-router-dom";

const AdminSideBar = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [phoneActive, setPhoneActive] = useState<boolean>(
    window.innerWidth < 1100
  );
  const resizeHandler = () => {
    setPhoneActive(window.innerWidth < 1100);
  };
  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.addEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <>
      {phoneActive && (
        <button id="hamburger" onClick={() => setShowModal(true)}>
          <HiMenuAlt3 />
        </button>
      )}
      <aside
        style={
          phoneActive
            ? {
                width: "20rem",
                height: "100vh",
                position: "fixed",
                top: 0,
                left: showModal ? 0 : "-20rem",
                transition: "all 0.8s ",
              }
            : {}
        }
      >
        {/* div 1---- */}
        <div>
          <h5>Dashboard</h5>
          <ul>
            <li>
              <NavLink to={"/admin/dashboard"} className="sidebar-link">
                <RiDashboardFill />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to={"/admin/products"} className="sidebar-link">
                <RiShoppingBag3Fill />
                Product
              </NavLink>
            </li>
            <li>
              <NavLink to={"/admin/customer"} className="sidebar-link">
                <IoIosPeople />
                Customer
              </NavLink>
            </li>
            <li>
              <NavLink to={"/admin/transaction"} className="sidebar-link">
                <AiFillFileText />
                Transaction
              </NavLink>
            </li>
          </ul>
        </div>
        {/* div 2---- */}
        <div>
          <h5>Charts</h5>
          <ul>
            <li>
              <NavLink to={"/admin/chart/bar"} className="sidebar-link">
                <FaChartBar />
                Bar
              </NavLink>
            </li>
            <li>
              <NavLink to={"/admin/chart/pie"} className="sidebar-link">
                <FaChartPie />
                Pie
              </NavLink>
            </li>
            <li>
              <NavLink to={"/admin/chart/line"} className="sidebar-link">
                <FaChartLine />
                Line
              </NavLink>
            </li>
          </ul>
        </div>
        {/* div 3---- */}
        <div>
          <h5>Apps</h5>
          <ul>
            <li>
              <NavLink to={"/admin/app/stopwatch"} className="sidebar-link">
                <FaStopwatch />
                Stop-watch
              </NavLink>
            </li>
            <li>
              <NavLink to={"/admin/app/coupon"} className="sidebar-link">
                <RiCoupon3Fill />
                Coupon
              </NavLink>
            </li>
            <li>
              <NavLink to={"/admin/app/toss"} className="sidebar-link">
                <FaGamepad />
                Toss
              </NavLink>
            </li>
          </ul>
        </div>
        {showModal ? (
          <button id="close-modal-btn" onClick={() => setShowModal(false)}>
            Close
          </button>
        ) : (
          ""
        )}
      </aside>
    </>
  );
};

export default AdminSideBar;
