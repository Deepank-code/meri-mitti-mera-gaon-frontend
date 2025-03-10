import { useState } from "react";
import ProductCard from "./Home/ProductCard";
import {
  useCategoriesQuery,
  useSearchProductsQuery,
} from "../redux/api/productApi";
import { CustomError } from "../types/api-types";
import toast from "react-hot-toast";
import { Skleton } from "../Components/Loader";
import { useDispatch } from "react-redux";
import { CartItem } from "../types/types";
import { addToCart } from "../redux/reducer/cartReducer";

const Search = () => {
  const {
    data: categoryData,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
    error: categoryError,
  } = useCategoriesQuery("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const {
    isLoading: isProductLoading,
    data: searchProductData,
    isError: isSearchProductError,
    error: searchProductError,
  } = useSearchProductsQuery({
    search,
    sort,
    category,
    price: maxPrice,
    page,
  });

  const addTocartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) {
      return toast.error("out of stock");
    }
    dispatch(addToCart(cartItem));
    toast.success(`${cartItem.name} added to cart`);
  };
  const isNextPage = page > 1;
  const isPrevpage = page < 1;
  if (isCategoryError) {
    const err = categoryError as CustomError;
    toast.error(err.data.message);
  }
  if (isSearchProductError) {
    const err = searchProductError as CustomError;
    toast.error(err.data.message);
  }

  return (
    <div className="product-search-page">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Low to High</option>
            <option value="desc">Price (high to Low)</option>
          </select>
        </div>
        <div>
          <h4>Max Price: {maxPrice || ""}</h4>
          <input
            type="range"
            min={10}
            max={10000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
        <div>
          <h4>Category</h4>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All</option>
            {!isCategoryLoading &&
              categoryData?.categories?.map((i) => {
                return (
                  <option key={i} value={i}>
                    {i.toUpperCase()}
                  </option>
                );
              })}
          </select>
        </div>
      </aside>
      <main>
        <h1>Product</h1>
        <input
          type="text"
          placeholder="Search by Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {isProductLoading ? (
          <Skleton />
        ) : (
          <div className="search-product-list">
            {searchProductData?.products &&
              searchProductData.products.map((i) => {
                return (
                  <ProductCard
                    key={i._id}
                    productId={i._id}
                    price={i.price}
                    stock={i.stock}
                    name={i.name}
                    photos={i.photos}
                    handler={addTocartHandler}
                  />
                );
              })}
          </div>
        )}

        {searchProductData && searchProductData?.totalPage >= 1 && (
          <article>
            <button
              disabled={!isPrevpage}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Prev
            </button>
            <span>
              {page} of {searchProductData.totalPage}
            </span>
            <button
              disabled={!isNextPage}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </article>
        )}
      </main>
    </div>
  );
};

export default Search;
