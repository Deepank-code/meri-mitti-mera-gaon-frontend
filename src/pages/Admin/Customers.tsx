import { Column } from "react-table";
import AdminSideBar from "../../Components/AdminSideBar";
import { ReactElement, useEffect, useState } from "react";
import TableHOC from "../../Components/TableHOC";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  useAllUsersQuery,
  useDeleteUserMutation,
} from "../../redux/api/userApi";
import { CustomError } from "../../types/api-types";
import toast from "react-hot-toast";
import { Skleton } from "../../Components/Loader";

import { responseToast } from "../../utils/feature";
import { userPhoto } from "./Dashboard";

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

const Customers = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { isLoading, data, isError, error } = useAllUsersQuery(user?._id!);
  const [rows, setRows] = useState<DataType[]>([]);
  const [deleteUser] = useDeleteUserMutation();

  const deleteHandler = async (userId: string) => {
    const res = await deleteUser({ userId, adminUserId: user?._id! });
    responseToast(res, null, "");
  };
  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  useEffect(() => {
    if (data) {
      setRows(
        data.users.map((i) => {
          return {
            avatar: (
              <img
                style={{ borderRadius: "50%" }}
                src={(!isLoading && i?.photo) || userPhoto}
                loading="lazy"
              />
            ),
            name: i.name,
            email: i.email,
            gender: i.gender,
            role: i.role,
            action: (
              <button onClick={() => deleteHandler(i._id)}>
                <FaTrash />
              </button>
            ),
          };
        })
      );
    }
  }, [data]);
  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-customer-box",
    "Customers",
    rows.length > 6
  )();

  return (
    <div className="adminContainer">
      {/* sidebar */}
      <AdminSideBar />
      <main>{isLoading ? <Skleton count={20} /> : Table}</main>
    </div>
  );
};

export default Customers;
