// import { DotenvConfigOptions } from "dotenv";
// DotenvConfigOptions()
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import OrderView from "./pages/OrderView";
import NewProduct from "./Admin/NewProduct";
import BuySell from "./pages/BuySell";
import AddInventory from "./Admin/Invertory/AddInventory";
import OrderDetail from "./Admin/Order/OrderDetail";
import CustomerMain from "./Admin/Customer/CustomerMain";
import CustomerDetail from "./Admin/Customer/CustomerDetail";
import GraphicTab from "./components/GraphicTab";
import AdminUi from "./Layout/AdminUi";
import UseUi from "./Layout/UseUi";
import Home from "./pages/home";
import Categories from "./pages/categories";
import Product from "./pages/Product";
import Bidask from "../src/pages/bidask";
import BuySellManagment from "./pages/BuySellManagment";
import "react-toastify/dist/ReactToastify.css";
import UserBuySell from "./components/UserBuySell";
import Compare from "./components/Compare";
import FavouriteList from "./components/FavouriteList";
import Blanck from "./components/Blanck";
import ForgotPassword from "./components/ForgotPassword";
import Tooltip from "./components/Tooltip";
import ResetPassword from "./components/ResetPassword";
import TermCondition from "./components/TermCondition";
import OrderConfirmation from "./components/OrderConfirmation";
import PrivacyPolicy from "./components/PrivacyPolicy";
import NewProfile from "./components/NewProfile";
import PackageSlip from "./components/PackageSlip";
import StripeAccount from "./Admin/Customer/StripeAccount";
import Shipping from "./Admin/Customer/Shipping";
import Banner from "./components/Banner";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/reset/:id" element={<ResetPassword />} />
      <Route path="/error" element={<Blanck />} />
      <Route path="/tooltip" element={<Tooltip />} />
      <Route path="/bidask/:id" element={<Bidask />} />
      <Route path="/bidask/:id/:buy" element={<Bidask />} />
      <Route path="/userBuySell" element={<UserBuySell />} />
      <Route path="/compareBuySell" element={<Compare />} />
      <Route path="/categories/:id" element={<Categories />} />
      <Route path="/categories/:id/:name" element={<Categories />} />
      <Route path="/OrderDetail/:id" element={<OrderDetail />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/term" element={<TermCondition />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/order" element={<OrderConfirmation />} />

      {/* Start admin layout */}
      <Route path="/" element={<AdminUi />}>
        <Route path="/buySell" element={<BuySell />} />
        <Route path="/orderView" element={<OrderView />} />
        <Route path="/createproduct" element={<NewProduct />} />
        <Route path="/Productlist" element={<GraphicTab />} />
        <Route path="/addInventory/:id" element={<AddInventory />} />
        <Route path="/customerMain" element={<CustomerMain />} />
        <Route path="/customerDetail/:id" element={<CustomerDetail />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/banner" element={<Banner />} />
      </Route>
      {/* End Admin Layout */}
      
      {/* Start user Layout */}
      <Route path="/" element={<UseUi />}>
        <Route
          path="/buySellManagment/selling"
          element={<BuySellManagment />}
        />
        <Route path="/buySellManagment/buying" element={<BuySellManagment />} />
        {/* <Route path="/updateUser/:id" element={<UpdateCustomer />} /> */}
        <Route path="/profile/:id" element={<NewProfile />} />
        <Route path="/stripeconnectaccount/:id" element={<StripeAccount />} />
        <Route path="/package" element={<PackageSlip />} />
        <Route
          path="/buySellManagment/pending"
          element={<BuySellManagment />}
        />
        <Route
          path="/buySellManagment/history"
          element={<BuySellManagment />}
        />
        <Route
          path="/buySellManagment/setting"
          element={<BuySellManagment />}
        />
        <Route path="/buySellManagment/favorites" element={<FavouriteList />} />
      </Route>
    {/* End User Layout */}
    </Routes>
    {/* </div>
    </div> */}
  </BrowserRouter>
);
reportWebVitals();
