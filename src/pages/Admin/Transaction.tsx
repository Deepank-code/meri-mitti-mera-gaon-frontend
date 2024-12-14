import { Column } from "react-table";
import AdminSideBar from "../../Components/AdminSideBar";
import { ReactElement, useCallback, useState } from "react";
import TableHOC from "../../Components/TableHOC";
import { Link } from "react-router-dom";
interface DataType {
  user: ReactElement;
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
const img = "https://randomuser.me/api/portraits/men/75.jpg";
const arr: DataType[] = [
  {
    user: <img style={{ borderRadius: "50%" }} src={img} alt="name" />,

    amount: 2000,
    discount: 50,
    quantity: 22,
    status: <span className="red">processing</span>,

    action: <Link to="/admin/transaction/nhjgfh">Manage</Link>,
  },
  {
    user: <img style={{ borderRadius: "50%" }} src={img} alt="name" />,

    amount: 2000,
    discount: 50,
    quantity: 22,
    status: <span className="green">processing</span>,
    action: <Link to="/admin/transaction/gfhgh">Manage</Link>,
  },
  {
    user: <img style={{ borderRadius: "50%" }} src={img} alt="name" />,

    amount: 2000,
    discount: 50,
    quantity: 22,
    status: <span className="purple">processing</span>,
    action: <Link to="/admin/transaction/gfhfgh">Manage</Link>,
  },
  {
    user: <img style={{ borderRadius: "50%" }} src={img} alt="name" />,

    amount: 2000,
    discount: 50,
    quantity: 22,
    status: <span className="red">processing</span>,

    action: <Link to="/admin/transaction/gfdfg">Manage</Link>,
  },
];
const Transaction = () => {
  const [data] = useState<DataType[]>(arr);
  const Table = useCallback(
    TableHOC<DataType>(
      columns,
      data,
      "dashboard-customer-box",
      "Transaction",
      true
    ),
    []
  );
  return (
    <div className="adminContainer">
      {/* sidebar */}
      <AdminSideBar />
      <main>{Table()}</main>
    </div>
  );
};

export default Transaction;
