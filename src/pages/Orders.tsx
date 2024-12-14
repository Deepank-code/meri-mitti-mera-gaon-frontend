import { ReactElement, useState } from "react";
import TableHOC from "../Components/TableHOC";
import { Column } from "react-table";
import { Link } from "react-router-dom";
type DataType = {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
  action: ReactElement;
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
  {
    Header: "Action",
    accessor: "action",
  },
];
const Orders = () => {
  const [row] = useState<DataType[]>([
    {
      _id: "fgfgfd",
      amount: 5634,
      quantity: 23,
      discount: 5999,
      status: <span className="red">Processing</span>,
      action: <Link to={`/order/$fgfgfd`}>View</Link>,
    },
  ]);
  const Table = TableHOC<DataType>(
    column,
    row,
    "dashboard-product-box",
    "Orders",
    row.length > 0
  );
  return (
    <div className="container">
      <h1>My Orders</h1>
      {Table()}
    </div>
  );
};

export default Orders;
