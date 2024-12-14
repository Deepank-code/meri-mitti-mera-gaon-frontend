import { ChangeEvent, FormEvent, useState } from "react";
import AdminSideBar from "../../../Components/AdminSideBar";
import { useNewProductMutation } from "../../../redux/api/productApi";
import { useSelector } from "react-redux";

import { responseToast } from "../../../utils/feature";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/store";

const NewProduct = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number>(100);
  const [stock, setStock] = useState<number>(1);
  const [photoPrev, setPhotoPrev] = useState<string>("");
  const [photo, setPhoto] = useState<File>();
  const [newProduct] = useNewProductMutation();
  const navigate = useNavigate();
  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        if (typeof reader.result === "string") setPhotoPrev(reader.result);
        setPhoto(file);
      };
    }
  };
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // || !product.photo
    if (!name || !price || stock < 0 || !category || !photo) return;

    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price.toString());
    formData.set("stock", stock.toString());
    formData.set("photo", photo);
    formData.set("category", category);

    const res = await newProduct({ id: user!._id, formData });

    responseToast(res, navigate, "/admin/products");
  };
  return (
    <div className="adminContainer">
      {/* sidebar */}
      <AdminSideBar />
      <main className="product-management">
        <article>
          <form onSubmit={submitHandler}>
            <h2>New Product</h2>
            <div>
              <label htmlFor="name">Name</label>
              <input
                required
                type="text"
                placeholder="name"
                value={name}
                id="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <input
                required
                type="number"
                placeholder="price"
                value={price}
                id="price"
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="stock">stock</label>
              <input
                required
                type="number"
                placeholder="Stock"
                value={stock}
                id="stock"
                onChange={(e) => setStock(Number(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="category">Category</label>
              <input
                required
                type="string"
                placeholder="Category"
                value={category}
                id="category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="photo">Photo</label>
              <input type="file" onChange={changeImageHandler} />
            </div>
            {photoPrev && <img src={photoPrev} alt="New Image" />}

            <button type="submit">Create Product</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewProduct;
