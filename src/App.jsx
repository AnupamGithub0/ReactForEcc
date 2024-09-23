import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./Pages/Homepage";
import Singin from "./Pages/Singin";
import PrivateAdminDash from "./Components/Admin/PrivateAdminDash";
import Admindashboard from "./Components/Admin/Admindashboard";
import CreateProductAdmin from "./Components/Admin/CreateProductAdmin";
import GetSingleProduct from "./Pages/GetSingleProduct";
import CategoriesProducts from "./Pages/CategoriesProducts";
import CartCom from "./Components/CartCom";
import CashfeeTest from "./Components/CashfeeTest";
import CartOrders from "./Components/CartOrders";
import ProductStatus from "./Components/Admin/ProductStatus";
import SearchProduct from "./Components/SearchProduct";
import ForgotPassword from "./Pages/ForgotPassword";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/signin" element={<Singin />}></Route>

        {/* admin-dashboard */}
        <Route path="/dashboard" element={<PrivateAdminDash />}>
          <Route path="admin" element={<Admindashboard />} />
          <Route path="admin/create-product" element={<CreateProductAdmin />} />
          <Route path="admin/product-status" element={<ProductStatus />} />

        </Route>
        {/* get-single-product */}
        <Route path="/product/:productId" element={<GetSingleProduct />}></Route>

        {/* get-all-products by categories */}
        <Route path="/categories/:category" element={<CategoriesProducts />}></Route>
        {/* cart */}
        <Route path="/cart/" element={<CartCom />}></Route>
        <Route path="/cashfee" element={<CashfeeTest />}></Route>
        <Route path="/user/orders" element={<CartOrders />}></Route>

        {/* seach_product */}
        <Route path="/search-results" element={<SearchProduct />} />

        {/* forgot-password */}
        <Route path="/forgot-password" element={<ForgotPassword />} />




        
      </Routes>
    </>
  );
}

export default App;
