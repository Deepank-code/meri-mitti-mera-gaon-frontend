import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { lazy, Suspense, useEffect } from "react";
import Loader from "./Components/Loader";
import PieChart from "./pages/Admin/charts/PieCharts.tsx";
import LineChart from "./pages/Admin/charts/LineCharts.tsx";
import Header from "./pages/Layout/Header.tsx";
import { Toaster } from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.tsx";
import { useDispatch, useSelector } from "react-redux";
import { userExist, userNotExist } from "./redux/reducer/userReducer.ts";
import { getUser } from "./redux/api/userApi.ts";
import { UserReducerInitalStateType } from "./types/reducer-type.ts";
import ProtectedRoute from "./Components/ProtectedRoute.tsx";
const Home = lazy(() => import("./pages/Home/Home.tsx"));
const Cart = lazy(() => import("./pages/Cart.tsx"));
const Shipping = lazy(() => import("./pages/Shipping.tsx"));
const Login = lazy(() => import("./pages/Login.tsx"));
const Search = lazy(() => import("./pages/Search.tsx"));
const Orders = lazy(() => import("./pages/Orders.tsx"));

// admin routes
const Dashboard = lazy(() => import("./pages/Admin/Dashboard.tsx"));
const Products = lazy(() => import("./pages/Admin/Products"));

const Customers = lazy(() => import("./pages/Admin/Customers"));
const NewProduct = lazy(
  () => import("./pages/Admin/management/NewProduct.tsx")
);
const Transaction = lazy(() => import("./pages/Admin/Transaction"));
const ProductManagement = lazy(
  () => import("./pages/Admin/management/ProductManagement.tsx")
);
const Transactionmanagement = lazy(
  () => import("./pages/Admin/management/Transactionmanagement.tsx")
);
const BarCharts = lazy(() => import("./pages/Admin/charts/BarCharts.tsx"));

function App() {
  const { user, loading } = useSelector(
    (state: { userReducer: UserReducerInitalStateType }) => state.userReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getUser(user.uid);

        dispatch(userExist(data.user));
      } else dispatch(userNotExist());
    });
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Router>
      <Header user={user} />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<Search />} />
          {/* not logged in routes */}
          <Route
            path="/login"
            element={
              <ProtectedRoute isAuthenticated={user ? false : true}>
                <Login />
              </ProtectedRoute>
            }
          />

          {/* loogfed in user routes */}
          <Route
            element={<ProtectedRoute isAuthenticated={user ? true : false} />}
          >
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/orders" element={<Orders />} />
            {/* <Route path="/order/:id" element={<Order />} /> */}
          </Route>
          {/* admin routes */}
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={true}
                adminOnly={true}
                admin={user?.role === "admin" ? true : false}
              />
            }
          >
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/customer" element={<Customers />} />
            <Route path="/admin/transaction" element={<Transaction />} />
          </Route>

          {/* charts */}
          <Route path="/admin/chart/bar" element={<BarCharts />} />
          <Route path="/admin/chart/pie" element={<PieChart />} />
          <Route path="/admin/chart/line" element={<LineChart />} />

          {/* management*/}
          <Route path="/admin/product/new-product" element={<NewProduct />} />
          <Route path="/admin/product/:id" element={<ProductManagement />} />
          <Route
            path="/admin/transaction/:id"
            element={<Transactionmanagement />}
          />
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </Router>
  );
}

export default App;
