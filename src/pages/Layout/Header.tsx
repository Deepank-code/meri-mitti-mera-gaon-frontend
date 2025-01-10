import { useEffect, useRef, useState } from "react";
import {
  FaHamburger,
  FaHome,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { GiFruitBowl } from "react-icons/gi";
import { MdLocalPostOffice } from "react-icons/md";
import { PiBankFill } from "react-icons/pi";
import { Link, NavLink } from "react-router-dom";
import { User } from "../../types/types";
import logo from "../../assets/logo.png";
import name from "../../assets/name.png";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import toast from "react-hot-toast";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { CartReducerInitalStateType } from "../../types/reducer-type";
interface PropTypes {
  user: User | null;
}

const Header = ({ user }: PropTypes) => {
  const [IsOpen, setIsOpen] = useState<boolean>(false);
  const [isLinksModalOpen, setisLinksModalOpen] = useState<boolean>(true);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const { loading, cartItems } = useSelector(
    (state: { cartReducer: CartReducerInitalStateType }) => state.cartReducer
  );
  const logouthandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign Out Successfully");

      setIsOpen(false);
    } catch (error) {
      toast.error("Sign Out failed!!" + error);
    }
  };

  function checkClickOutside(e: MouseEvent) {
    if (window.innerWidth > 600) return;
    if (modalRef.current !== null) {
      if (isLinksModalOpen && !modalRef.current.contains(e.target as Node))
        setisLinksModalOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", checkClickOutside);
  }, [isLinksModalOpen]);

  return (
    <>
      <nav className="header">
        <div>
          <img src={logo} alt="logo" />
          <img className="name-logo" src={name} alt="" />
        </div>
        <FaHamburger
          className="hamburger"
          onClick={() => setisLinksModalOpen((prev) => !prev)}
        />

        {isLinksModalOpen && (
          // <div className="nav-links responsive">
          <div className="nav-links responsive" ref={modalRef}>
            <NavLink to={"/"}>
              <FaHome />
              Home
            </NavLink>
            <NavLink to={"/search"}>
              <GiFruitBowl />
              Buy Veggies
            </NavLink>

            <NavLink to={"/govt_scheme"}>
              {" "}
              <PiBankFill />
              Govt Schemes
            </NavLink>

            <NavLink to={"/post_scheme"}>
              <MdLocalPostOffice />
              Post Office Scheme
            </NavLink>
            <NavLink to={"/cart"}>
              {!loading && (
                <span
                  className="item-in-cart"
                  data-text={cartItems.length}
                ></span>
              )}
              <FaCartShopping />
            </NavLink>
            {user?._id ? (
              <button onClick={() => setIsOpen((prev) => !prev)}>
                <FaUser />
                <dialog open={IsOpen}>
                  <div>
                    {user.role === "admin" && (
                      <Link to={"/admin/dashboard"}>Admin</Link>
                    )}
                    <Link to={"/orders"}>Orders</Link>
                    <button onClick={logouthandler}>
                      <FaSignOutAlt />
                    </button>
                  </div>
                </dialog>
              </button>
            ) : (
              <Link to={"/login"}>
                <FaSignInAlt />
              </Link>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;
