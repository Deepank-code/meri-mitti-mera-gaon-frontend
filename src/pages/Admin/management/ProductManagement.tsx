import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import AdminSideBar from "../../../Components/AdminSideBar";
import { useSelector } from "react-redux";

import { UserReducerInitalStateType } from "../../../types/reducer-type";
import {
  useDeleteProductMutation,
  useProductDetailsQuery,
  useUpdateProductMutation,
} from "../../../redux/api/productApi";
import { useNavigate, useParams } from "react-router-dom";
import { server } from "../../../redux/store";
import { Skleton } from "../../../Components/Loader";
import { responseToast } from "../../../utils/feature";
import { FaTrash } from "react-icons/fa";

const ProductManagement = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitalStateType }) => state.userReducer
  );
  const params = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useProductDetailsQuery(
    params.id!,
    {
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true,
    }
  );
  if (!data) {
    console.log("no data receiverd");
  }
  console.log("error " + isError);

  const { name, photo, price, stock, category } = data?.product || {
    name: "",
    price: 0,
    category: "",
    stock: 0,
    photo: "",
  };
  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [stockupdate, setStockUpdate] = useState<number>(stock);
  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [photoUpdate, setPhotoUpdate] = useState<string>("");
  const [photoFile, setPhotoFile] = useState<File>();
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    const reader: FileReader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoUpdate(reader.result);
          setPhotoFile(file);
        }
      };
    }
  };
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    if (photoUpdate) formData.set("photo", photoUpdate);
    if (photoFile) formData.set("photo", photoFile);
    const res = await updateProduct({
      formData,
      userId: user?._id!,
      productId: data?.product._id!,
    });
    responseToast(res, navigate, "/admin/products");
  };
  const deleteHandler = async () => {
    const res = await deleteProduct({
      userId: user?._id!,
      productId: data?.product._id!,
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
              <img src={`${server}${photo}`} alt="pro" />
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
                  <label htmlFor="photo">Photo</label>
                  <input required type="file" onChange={changeImageHandler} />
                </div>
                {photoUpdate && <img src={photoUpdate} alt="New Image" />}

                <button type="submit">Update</button>
              </form>
            </article>
          </>
        )}
      </main>
    </div>
  );
};

export default ProductManagement;
