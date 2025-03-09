import { FormEvent, useState } from "react";
import AdminSideBar from "../../../Components/AdminSideBar";
import { useNewProductMutation } from "../../../redux/api/productApi";
import { useSelector } from "react-redux";

import { responseToast } from "../../../utils/feature";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/store";
import { useFileHandler } from "6pp";

const NewProduct = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number>(100);
  const [stock, setStock] = useState<number>(1);
  const [description, setDescription] = useState<string>("");

  const [newProduct] = useNewProductMutation();
  const navigate = useNavigate();
  const photos = useFileHandler("multiple", 10, 5);
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!name || !price || stock < 0 || !category || !description) return;

      if (!photos.file || photos.file.length === 0) {
        alert("Please upload at least one photo");
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price.toString());
      formData.append("stock", stock.toString());
      formData.append("category", category);
      formData.append("description", description);
      photos.file.forEach((file) => {
        formData.append("photos", file);
      });

      try {
        const res = await newProduct({ id: user?._id!, formData });

        responseToast(res, navigate, "/admin/products");
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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
              <label htmlFor="description">Description</label>
              <textarea
                required
                placeholder="description"
                value={description}
                id="category"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="photos">Photo</label>
              <input
                multiple
                accept="image/*"
                type="file"
                onChange={photos.changeHandler}
              />
            </div>
            {photos.error && <p>{photos.error}</p>}

            <div style={{ display: "flex", gap: "1rem", overflowX: "auto" }}>
              {photos.preview &&
                photos?.preview.map((img, i) => (
                  <img
                    style={{ width: 50, height: 50, borderRadius: "5px" }}
                    key={i}
                    src={img}
                    alt="some images"
                  />
                ))}
            </div>
            <button disabled={isLoading} type="submit">
              Create Product
            </button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewProduct;
