// src/Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("all");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get("/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchPrice =
      maxPrice === "all" || product.price <= Number(maxPrice);

    return matchCategory && matchSearch && matchPrice;
  });


  if (loading) {
    return <h2 style={{ padding: 20 }}>Loading products…</h2>;
  }

  return (
    <div style={{ width: "100%", padding: "20px 16px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", marginBottom: 24 }}>
          Products
        </h2>

        {/* FILTER BAR */}
        <div className="filter-row">
          {/* LEFT: SEARCH + PRICE */}
          <div className="filter-left">
            <input
              className="search-input"
              placeholder="Search products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="price-filter"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            >
              <option value="all">All Prices</option>
              <option value="500">Under ₹500</option>
              <option value="1000">Under ₹1000</option>
              <option value="1500">Under ₹1500</option>
            </select>
          </div>

          {/* RIGHT: CATEGORY */}
          <div className="category-bar">
            {[
              { key: "all", label: "All", icon: "🛍️" },
              { key: "shirts", label: "Shirts", icon: "👕" },
              { key: "pants", label: "Pants", icon: "👖" },
              { key: "watches", label: "Watches", icon: "⌚" },
              { key: "kurtas", label: "Kurtas", icon: "🧵" },
            ].map((cat) => (
              <button
                key={cat.key}
                className={`category-btn ${selectedCategory === cat.key ? "active" : ""
                  }`}
                onClick={() => setSelectedCategory(cat.key)}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        </div>



        {/* PRODUCT GRID */}
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />

              <h3>{product.name}</h3>
              <p className="price">₹{product.price}</p>
              <p className="desc">{product.description}</p>

              <Link
                to={`/product/${product.id}`}
                className="btn-primary"
              >
                View Product
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
