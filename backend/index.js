// ===== AUTH MIDDLEWARE =====
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  // fake token check (for now)
  if (token !== "demo-token") {
    return res.status(401).json({ message: "Invalid token" });
  }

  next();
};

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ===== FAKE DATABASE =====
const users = []; // stores registered users

const products = [
  {
    id: 1,
    name: "Blue Shirt",
    price: 499,
    description: "Soft cotton shirt",
    category: "shirts",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
  },
  {
    id: 2,
    name: "Casual Pants",
    price: 899,
    description: "Comfort fit pants",
    category: "pants",
    image: "https://images.unsplash.com/photo-1583004159944-a8f14d9b6f8d"
  },
  {
    id: 3,
    name: "Wrist Watch",
    price: 1299,
    description: "Stylish analog watch",
    category: "watches",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
  },
  {
    id: 4,
    name: "Men Kurta",
    price: 999,
    description: "Traditional cotton kurta",
    category: "kurtas",
    image: "https://images.unsplash.com/photo-1618354691249-18772e8c99bb"
  }
];



// ===== ROOT =====
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// ===== PRODUCTS =====
app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

// ===== REGISTER =====
app.post("/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  const exists = users.find(u => u.email === email);
  if (exists)
    return res.status(400).json({ message: "User already exists" });

  users.push({ email, password });

  // fake token
  res.json({ token: "demo-token" });
});

// ===== LOGIN =====
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user)
    return res.status(401).json({ message: "Invalid credentials" });

  res.json({ token: "demo-token" });
});

// ===== START SERVER =====
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
