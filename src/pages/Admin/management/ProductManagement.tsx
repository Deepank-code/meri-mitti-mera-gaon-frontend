import { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AdminSideBar from "../../../Components/AdminSideBar";

import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteProductMutation,
  useProductDetailsQuery,
  useUpdateProductMutation,
} from "../../../redux/api/productApi";
import { UserReducerInitalStateType } from "../../../types/reducer-type";

import { useFileHandler } from "6pp";
import { FaTrash } from "react-icons/fa";
import { Skleton } from "../../../Components/Loader";
import { responseToast } from "../../../utils/feature";

const ProductManagement = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitalStateType }) => state.userReducer
  );
  const params = useParams();
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useProductDetailsQuery(params.id!, {
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });
  if (!data) {
    console.log("no data receiverd");
  }

  const { name, photos, price, stock, category, description } =
    data?.product || {
      name: "",
      price: 0,
      category: "",
      stock: 0,
      photos: [],
      description: "",
    };
  const [btnLoading, setBtnLoading] = useState(false);
  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [stockupdate, setStockUpdate] = useState<number>(stock);
  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [descriptionUpdate, setDescriptionUpdate] =
    useState<string>(description);

  const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const photosFile = useFileHandler("multiple", 10, 5);
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBtnLoading(true);

    try {
      const formData = new FormData();
      if (nameUpdate) {
        formData.set("name", nameUpdate);
      }
      if (priceUpdate) {
        formData.set("price", priceUpdate.toString());
      }
      if (stockupdate !== undefined) {
        formData.set("stock", stockupdate.toString());
      }
      if (categoryUpdate) formData.set("category", categoryUpdate);
      if (descriptionUpdate) formData.set("description", descriptionUpdate);

      if (photosFile.file && photosFile.file.length > 0) {
        photosFile.file.forEach((file) => {
          formData.append("photos", file);
        });
      }

      const res = await updateProduct({
        formData,
        userId: user!._id,
        productId: data!.product._id,
      });
      responseToast(res, navigate, "/admin/products");
    } catch (error) {
      console.log(error);
    } finally {
      setBtnLoading(false);
    }
  };
  const deleteHandler = async () => {
    const res = await deleteProduct({
      userId: user!._id,
      productId: data!.product._id,
    });
    responseToast(res, navigate, "/admin/products");
  };
  useEffect(() => {
    if (!data) refetch();

    if (data) {
      setNameUpdate(data.product.name);
      setPriceUpdate(data.product.price);
      setStockUpdate(data.product.stock);
      setCategoryUpdate(data.product.category);
      setDescriptionUpdate(data.product.description);
    }
  }, [data, refetch]);

  return (
    <div className="adminContainer">
      {/* sidebar */}
      <AdminSideBar />
      <main className="product-management">
        {isLoading ? (
          <Skleton />
        ) : (
          <>
            <section>
              <strong>ID -{data?.product && data?.product._id}</strong>
              {photos ? (
                <img src={photos[0]?.url} alt="Product" />
              ) : (
                <p>No image available</p>
              )}
              <p>{name}</p>
              <h2>₹{price}</h2>
              {stock > 0 ? (
                <span className="green">{stock} kg Available</span>
              ) : (
                <span className="red">Not available</span>
              )}
            </section>
            <article>
              <button className="product-delete-btn" onClick={deleteHandler}>
                <FaTrash />
              </button>
              <form onSubmit={submitHandler}>
                <h2>Update Product</h2>
                <div>
                  <label htmlFor="name">Name</label>
                  <input
                    required
                    type="text"
                    placeholder="name"
                    value={nameUpdate}
                    id="name"
                    onChange={(e) => setNameUpdate(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="price">Price</label>
                  <input
                    required
                    type="number"
                    placeholder="price"
                    value={priceUpdate}
                    id="price"
                    onChange={(e) => setPriceUpdate(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label htmlFor="stock">stock</label>
                  <input
                    required
                    type="number"
                    placeholder="Stock"
                    value={stockupdate}
                    id="stock"
                    onChange={(e) => setStockUpdate(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label htmlFor="category">Category</label>
                  <input
                    required
                    type="string"
                    placeholder="Category"
                    value={categoryUpdate}
                    id="category"
                    onChange={(e) => setCategoryUpdate(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="description">Description</label>
                  <textarea
                    required
                    placeholder="description"
                    value={descriptionUpdate}
                    id="category"
                    onChange={(e) => setDescriptionUpdate(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="photo">Photos</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    id="photos"
                    onChange={photosFile.changeHandler}
                  />
                </div>
                {photosFile.error && <p>{photosFile.error}</p>}
                <div
                  style={{ display: "flex", gap: "1rem", overflowX: "auto" }}
                >
                  {photosFile.preview &&
                    photosFile.preview.map((img, i) => (
                      <img
                        style={{ width: 100, height: 100 }}
                        key={i}
                        src={img}
                        alt="some images"
                      />
                    ))}
                </div>

                <button disabled={btnLoading} type="submit">
                  Update
                </button>
              </form>
            </article>
          </>
        )}
      </main>
    </div>
  );
};

export default ProductManagement;
