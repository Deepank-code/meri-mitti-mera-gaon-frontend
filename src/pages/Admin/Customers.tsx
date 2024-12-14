import { Column } from "react-table";
import AdminSideBar from "../../Components/AdminSideBar";
import { ReactElement, useCallback, useState } from "react";
import TableHOC from "../../Components/TableHOC";
import { FaTrash } from "react-icons/fa";

interface DataType {
  avatar: ReactElement;
  name: string;
  email: string;
  gender: string;
  role: string;
  action: ReactElement;
}
const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];
const img = "https://randomuser.me/api/portraits/men/75.jpg";
const arr: DataType[] = [
  {
    avatar: <img style={{ borderRadius: "50%" }} src={img} alt="name" />,
    name: "deepank",
    email: "deepsdj37@gmail.com",
    gender: "Male",
    role: "user",
    action: (
      <button>
        <FaTrash />
      </button>
    ),
  },
  {
    avatar: <img style={{ borderRadius: "50%" }} src={img} alt="name" />,
    name: "deepank",
    email: "deepsdj37@gmail.com",
    gender: "Male",
    role: "user",
    action: (
      <button>
        <FaTrash />
      </button>
    ),
  },
  {
    avatar: <img style={{ borderRadius: "50%" }} src={img} alt="name" />,
    name: "deepank",
    email: "deepsdj37@gmail.com",
    gender: "Male",
    role: "user",
    action: (
      <button>
        <FaTrash />
      </button>
    ),
  },
];
const Customers = () => {
  const [data] = useState<DataType[]>(arr);
  const Table = useCallback(
    TableHOC<DataType>(
      columns,
      data,
      "dashboard-customer-box",
      "Customers",
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

export default Customers;
