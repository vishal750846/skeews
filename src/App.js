import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Home from "../src/pages/home";
import Categories from "./pages/categories";
import Product from "./pages/Product";
import Bidask from "../src/pages/bidask";
import BuySell from "./pages/BuySell";
import BuySellManagment from "./pages/BuySellManagment";
import OrderView from "./pages/OrderView";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="App">
      <Home />
      <Categories />
      <Product />
      <Bidask />
      <BuySell />
      <BuySellManagment />
      {/* <OrderView /> */}
      <Dashboard />
    </div>
  );
}

export default App;
