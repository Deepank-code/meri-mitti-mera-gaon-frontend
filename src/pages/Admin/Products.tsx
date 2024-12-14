import { ReactElement, useEffect, useState } from "react";
import AdminSideBar from "../../Components/AdminSideBar";
import TableHOC from "../../Components/TableHOC";
import { Column } from "react-table";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useAllProductsQuery } from "../../redux/api/productApi";
import { RootState, server } from "../../redux/store";
import toast from "react-hot-toast";

import { useSelector } from "react-redux";
import { Skleton } from "../../Components/Loader";
import { CustomError } from "../../types/api-types";

interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}
const columns: Column<DataType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Stock",
    accessor: "stock",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Products = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, data, isError, error } = useAllProductsQuery(user!._id);
  const [rows, setRows] = useState<DataType[]>([]);
  console.log({ isLoading, isError, data });
  if (isError) {
    toast.error((error as CustomError).data.message);
  }
  useEffect(() => {
    if (data?.products) {
      setRows(
        data?.products &&
          data.products.map((i) => ({
            photo: <img src={`${server}${i.photo}`} />,
            name: i.name,
            price: i.price,
            stock: i.stock,
            action: <Link to={`/admin/product/${i._id}`}>Manage</Link>,
          }))
      );
    }
  }, [data]);
  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Products",
    rows.length > 6
  )();

  return (
    <div className="adminContainer">
      {/* sidebar */}
      <AdminSideBar />
      <main>
        {isLoading || !data?.products ? <Skleton count={3} /> : Table}
      </main>
      <Link className="create-product-btn" to="/admin/product/new-product">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Products;
