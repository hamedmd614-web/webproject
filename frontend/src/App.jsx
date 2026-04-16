// src/App.jsx
import { Routes, Route } from "react-router-dom";

import TopNav from "./TopNav";
import Footer from "./Footer";

import Home from "./Home";
import CartPage from "./CartPage";
import ProductPage from "./ProductPage";
import ContactUs from "./ContactUs";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  return (
    <>
      {/* HEADER */}
      <TopNav />

      {/* ROUTES ONLY */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/contact" element={<ContactUs />} />

        <Route
          path="/login"
          element={
            <ProtectedRoute publicOnly>
              <Login />
            </ProtectedRoute>
          }
        />

        <Route
          path="/register"
          element={
            <ProtectedRoute publicOnly>
              <Register />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* FOOTER */}
      <Footer />
    </>
  );
}
