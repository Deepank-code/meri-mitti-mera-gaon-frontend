import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  useAddReviewMutation,
  useAllReviewsQuery,
  useDeleteReviewMutation,
  useProductDetailsQuery,
} from "../redux/api/productApi";
import { Skleton } from "../Components/Loader";
import { CarouselButtonType, MyntraCarousel, Slider, useRating } from "6pp";
import { useState } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight, FaStar } from "react-icons/fa";
import Ratings from "../Components/Ratings";
import { BiShoppingBag } from "react-icons/bi";
import { CartItem } from "../types/types";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";
import { AiFillEdit } from "react-icons/ai";
import Modal from "../Components/Modal";
import { CiStar } from "react-icons/ci";
import { responseToast } from "../utils/feature";
import { RootState } from "../redux/store";
import { MessageResponse } from "../types/api-types";

export const userPhoto =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgF2suM5kFwk9AdFjesEr8EP1qcyUvah8G7w&s";
const NextButton: CarouselButtonType = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        color: "white",
        borderRadius: "50%",
        padding: "0.5rem",
        border: "none",
        cursor: "pointer",
        display: "grid",
        placeItems: "center",
      }}
    >
      <FaArrowCircleRight />
    </button>
  );
};
const PrevButton: CarouselButtonType = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        color: "white",
        borderRadius: "50%",
        padding: "0.5rem",
        border: "none",
        cursor: "pointer",
        display: "grid",
        placeItems: "center",
      }}
    >
      <FaArrowCircleLeft />
    </button>
  );
};

const ProductDetail = () => {
  const params = useParams();
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { isLoading, isError, data } = useProductDetailsQuery(params.id!);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addReviewLoading, setaddReviewLoading] = useState(false);
  const [deleteReview] = useDeleteReviewMutation();
  const navigate = useNavigate();
  const {
    data: reviewData,
    isLoading: reviewLoading,
    isError: reviewError,
  } = useAllReviewsQuery(params.id!);
  const [carouselOpen, setCarousalOpen] = useState(false);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [reviewComment, setReviewComment] = useState("");
  const [addReview] = useAddReviewMutation();
  const [deleteReviewLoader, setDeleteReviewLoader] = useState(false);

  const {
    Ratings: RatingEditiable,
    rating,
    setRating,
  } = useRating({
    value: 0,
    IconFilled: <FaStar />,
    IconOutline: <CiStar />,
    selectable: true,

    styles: {
      fontSize: `1.3rem`,
      color: "gold",
      justifyContent: "center",
    },
  });

  const deleteReviewHandler = async ({
    productId,
    userId,
  }: {
    productId: string;
    userId: string;
  }) => {
    try {
      setDeleteReviewLoader(true);
      const res = await deleteReview({ productId, userId });
      responseToast(res, navigate, `/product/${data?.product._id}`);
    } catch (error: any) {
      toast.error(error);
    } finally {
      setDeleteReviewLoader(false);
    }
  };
  const submitReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reviewData = {
      comment: reviewComment,
      rating,
    };
    try {
      setaddReviewLoading(true);
      const res = await addReview({
        productId: data?.product._id,
        userId: user?._id,
        data: reviewData,
      });
      setIsModalOpen(false);
      responseToast(res, navigate, `/product/${data?.product._id}`);
    } catch (error: any) {
      toast.error(error);
    } finally {
      setaddReviewLoading(false);
    }

    setRating(0);
    setReviewComment("");
  };
  function incHandler() {
    setQuantity((quantity) => quantity + 1);
  }

  function decHandler() {
    if (quantity <= 0) return;
    setQuantity((quantity) => quantity - 1);
  }
  const addTocartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) {
      return toast.error("out of stock");
    }
    if (cartItem.stock < cartItem.quantity) {
      return toast.error("This much of stock is not available");
    }
    dispatch(addToCart(cartItem));
    toast.success(`${cartItem.name} added to cart`);
  };
  if (isError) {
    return <Navigate to="/404" />;
  }
  return (
    <div className="product-details">
      {isLoading ? (
        <ProductLoader />
      ) : (
        <main>
          <section>
            <Slider
              showThumbnails
              showNav={false}
              onClick={() => setCarousalOpen(true)}
              images={data?.product.photos.map((i) => i.url) || []}
            />
            {carouselOpen && (
              <MyntraCarousel
                setIsOpen={setCarousalOpen}
                NextButton={NextButton}
                PrevButton={PrevButton}
                images={data?.product.photos.map((i) => i.url) || []}
              />
            )}
          </section>
          <section>
            <div className="name-cat-div">
              {" "}
              <h1>{data?.product?.name}</h1>
              <code>{data?.product?.category}</code>
            </div>

            <h2>
              ₹{data?.product?.price}
              <code>/kg</code>
            </h2>
            <div className="rating-div ">
              <Ratings rating={data?.product?.ratings!} size={2} />
              <span style={{ float: "left" }}>
                ({data?.product.numofReviews})
              </span>
            </div>
            <article>
              <div>
                <button onClick={decHandler}>-</button>
                <span>
                  {data?.product.stock! < quantity ? (
                    <span className="red">out of stock</span>
                  ) : (
                    quantity
                  )}
                </span>
                <button onClick={incHandler}>+</button>
              </div>

              <button
                onClick={() =>
                  addTocartHandler({
                    productId: data?.product._id!,
                    name: data?.product.name!,
                    price: data?.product.price!,
                    stock: data?.product.stock!,
                    quantity: quantity,
                    photo: data?.product.photos[0].url!,
                  })
                }
              >
                Add to Cart <BiShoppingBag />
              </button>
            </article>
            <p>{data?.product?.description}</p>
          </section>
        </main>
      )}

      <section>
        <div className="review-container">
          {" "}
          <div>
            <h2>Customer Reviews</h2>
            <button className="editButton" onClick={() => setIsModalOpen(true)}>
              <AiFillEdit />
            </button>
            <Modal
              title="Write review"
              description=""
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            >
              <form onSubmit={submitReview}>
                <RatingEditiable />

                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="comment your review here..."
                />
                <button disabled={addReviewLoading}>submit</button>
              </form>
            </Modal>
            {reviewLoading ? (
              <Skleton width="50" count={2} height="100px" />
            ) : reviewData?.all_reviews.length == 0 ? (
              <h1>No Comments Yet</h1>
            ) : (
              reviewData?.all_reviews.map((review) => (
                <div className="review" key={review._id}>
                  <div className="review-header">
                    <img
                      src={review.user.photo || userPhoto}
                      alt="User Avatar"
                      className="avatar"
                    />
                    <div>
                      <strong>{review.user.name}</strong>

                      <Ratings rating={Number(review.rating)} size={0.8} />
                    </div>
                  </div>
                  <p>"{review.comment}"</p>
                  {user?._id === review?.user._id && (
                    <button
                      onClick={() =>
                        deleteReviewHandler({
                          productId: review?.product,
                          userId: user?._id,
                        })
                      }
                      disabled={deleteReviewLoader}
                    >
                      Delete Comment
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

const ProductLoader = () => {
  return (
    <div
      style={{
        display: "flex",
        gap: "2rem",

        height: "80vh",
      }}
    >
      <section style={{ width: "100%" }}>
        <Skleton containerHeight="100%" width="100%" height="100%" count={1} />
      </section>
      <section
        style={{
          width: "100%",

          display: "flex",
          padding: "1rem",
          flexDirection: "column",
          gap: "4rem",
        }}
      >
        <Skleton width="100%" count={4} />
        <Skleton width="100%" count={2} />
        <Skleton width="100%" count={4} />
      </section>
    </div>
  );
};

export default ProductDetail;
