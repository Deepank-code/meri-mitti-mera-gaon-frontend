import { Column } from "react-table";
import AdminSideBar from "../../Components/AdminSideBar";
import { ReactElement, useEffect, useState } from "react";
import TableHOC from "../../Components/TableHOC";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import { useAllOrdersQuery } from "../../redux/api/orderApi";
import { CustomError } from "../../types/api-types";
import toast from "react-hot-toast";
import { Skleton } from "../../Components/Loader";
import { RootState } from "../../redux/store";
interface DataType {
  user: string;
  amount: number;
  discount: number;
  quantity: number;
  status: ReactElement;
  action: ReactElement;
}
const columns: Column<DataType>[] = [
  {
    Header: "User",
    accessor: "user",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];
const arr: [] = [];

const Transaction = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { isLoading, data, isError, error } = useAllOrdersQuery(user?._id!);
  const [rows, setRows] = useState<DataType[]>(arr);
  console.log(data);
  if (isError) {
    toast.error((error as CustomError).data.message);
  }
  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-customer-box",
    "Transaction",
    true
  )();
  useEffect(() => {
    if (data?.orders) {
      setRows(
        data.orders.map((i) => ({
          user: i.user.name,
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
          action: <Link to={`/admin/transaction/${i._id}`}>Manage</Link>,
        }))
      );
    }
  }, [data]);

  return (
    <div className="adminContainer">
      {/* sidebar */}
      <AdminSideBar />
      <main>{isLoading ? <Skleton count={20} /> : Table}</main>
    </div>
  );
};

export default Transaction;
