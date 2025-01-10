import { ReactElement, useEffect, useState } from "react";
import TableHOC from "../Components/TableHOC";
import { Column } from "react-table";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMyOrdersQuery } from "../redux/api/orderApi";
import { RootState } from "../redux/store";
import { CustomError } from "../types/api-types";
import toast from "react-hot-toast";
import { Skleton } from "../Components/Loader";
type DataType = {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
};
const column: Column<DataType>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Qunatity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
];
const Orders = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { isLoading, data, isError, error } = useMyOrdersQuery(user!._id!);
  console.log(data);
  const [rows, setRows] = useState<DataType[]>([]);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  useEffect(() => {
    if (data)
      setRows(
        data.orders.map((i) => ({
          _id: i._id,
          amount: i.total,
          discount: i.discount,
          quantity: i.orderItems.length,
          status: (
            <span
              className={
                i.status === "Processing"
                  ? "red"
                  : i.status === "Shipped"
                  ? "green"
                  : "purple"
              }
            >
              {i.status}
            </span>
          ),
        }))
      );
  }, [data]);
  const Table = TableHOC<DataType>(
    column,
    rows,
    "dashboard-product-box",
    "my Orders",
    rows.length > 0
  )();
  return (
    <div className="container">
      {isLoading ? <Skleton count={20} /> : Table}
    </div>
  );
};

export default Orders;
