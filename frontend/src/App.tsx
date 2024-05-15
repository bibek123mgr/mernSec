import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Navbar from "./global/components/navbar/Navbar";
import Login from "./pages/auth/login/Login";
import SignUp from "./pages/auth/signup/SignUp";
import { Provider } from "react-redux";
import store from "./store/Store";
import Footer from "./global/components/footer/Footer";

function App() {
  return (
    <>
      <Provider store={store}>
      <BrowserRouter>
      <Navbar />
      <Routes>
         <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/register" element={<SignUp/>} /> 
          </Routes>
      <Footer/>
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
