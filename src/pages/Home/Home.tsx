import "./Home.css";
import FeatureSection from "./FeatureSection";
import AboutComp from "./AboutComp";

import ProductCard from "./ProductCard";
import { useLatestProductsQuery } from "../../redux/api/productApi";
import toast from "react-hot-toast";
import { Skleton } from "../../Components/Loader";
import { Link } from "react-router-dom";
import { CartItem } from "../../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/reducer/cartReducer";

const Home = () => {
  const { data, isLoading, isError } = useLatestProductsQuery("");
  const dispatch = useDispatch();
  if (isError) {
    toast.error("Can't fetch products");
  }
  const addTocartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) {
      return toast.error("out of stock");
    }
    dispatch(addToCart(cartItem));
    toast.success(`${cartItem.name} added to cart`);
  };

  return (
    <>
      <div id="parent-home-div">
        <div className="banner ">
          <div className="left-section">
            <p id="first-para">More Faster</p>
            <h2>
              From Village Farms to Your Table, Fresh, Pure, and 100%
              <span> Organic</span>🌾
            </h2>

            <Link to="/search" className="get-started-btn">
              Get Started
            </Link>
          </div>
          <div className="right-section">
            <img className="clock_icon" src="images/clock.png" alt="clock" />
            <div className="parent-img-div">
              <img className="bg-icon" src="images/bg-circle.png" />
              <img className="eating-girl" src="images/eating-girl.png" />
            </div>

            <img className="arrow-icon" src="images/arrow.png" />
          </div>
        </div>
        <FeatureSection />
        <div>
          <h2>Our Products</h2>
          <div className="products-section">
            {isLoading ? (
              <Skleton width="80vw" />
            ) : (
              data?.products?.map((p) => {
                return (
                  <ProductCard
                    key={p._id}
                    productId={p._id}
                    price={p.price}
                    stock={p.stock}
                    name={p.name}
                    photo={p.photo.url}
                    handler={addTocartHandler}
                  />
                );
              })
            )}
          </div>
        </div>

        {/* <OurMenu />  */}
        <AboutComp />
      </div>
    </>
  );
};
export default Home;
