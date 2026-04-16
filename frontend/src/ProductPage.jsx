import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "./CartContext";

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState("M"); // ✅ REQUIRED

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return <h2 style={{ padding: 20 }}>Loading product…</h2>;
  }

  if (!product) {
    return <h2 style={{ padding: 20 }}>Product not found</h2>;
  }

  return (
    <div className="product-page" style={{ color: "white" }}>
      {/* IMAGE */}
      <div className="product-page-image">
        <img
          src={product.image}
          alt={product.name}
          style={{ maxWidth: "100%", borderRadius: 8 }}
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/500x400?text=No+Image";
          }}
        />
      </div>

      {/* DETAILS */}
      <div className="product-page-details">
        <h1>{product.name}</h1>

        <p className="product-page-price">₹{product.price}</p>

        <p className="product-page-desc">
          {product.description}
        </p>

        {/* SIZE SELECT */}
        <div style={{ margin: "12px 0" }}>
          <label>Select Size:</label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            style={{ marginLeft: 10, padding: 6 }}
          >
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>

        {/* ADD TO CART */}
        <button
          className="btn-primary"
          onClick={() => addToCart(product, size)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
