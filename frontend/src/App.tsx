import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import Navbar from "./global/components/navbar/Navbar";
import Signup from "./pages/auth/signup/Signup";
import Home from "./pages/home/Home";
import SingleProduct from "./pages/product/SingleProduct";
import Contact from "./pages/contact/Contact";
import About from "./pages/about/About";
import Services from "./pages/services/Services";
import Footer from "./global/components/footer/Footer";
import Cart from "./pages/cart/Cart";
import Profile from "./pages/profile/Profile";
import AccountSetting from "./pages/profile/AccountSetting";
import Notification from "./pages/profile/Notification";
import Orders from "./pages/profile/Orders";
import ProfileLayout from "./pages/profile/ProfileLayout";
import CheckOut from "./pages/checkout/CheckOut";
import NotFound from "./pages/pagenotfound/NotFound";
import { useState } from "react";
import ProtectedRoute from "./ProtectedRoute";
import UnProtectedRoute from "./UnProtectedRoute";
import OrderDetails from "./pages/profile/OrderDetails";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route element={<UnProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
        </Route>
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/profile" element={<ProfileLayout />}>
            <Route index element={<Profile />} />
            <Route path="notification" element={<Notification />} />
            <Route path="setting" element={<AccountSetting />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:id" element={<OrderDetails />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
