// src/CartPage.jsx
import { useState } from "react";
import { useCart } from "./CartContext";

export default function CartPage() {
  const {
    cartItems,
    increaseQty,
    decreaseQty,
    removeFromCart
  } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const checkoutWhatsApp = () => {
    if (!name || !phone || !address) {
      alert("Please fill all details");
      return;
    }

    let msg = `🛒 New Order%0A%0A`;
    msg += `Name: ${name}%0A`;
    msg += `Phone: ${phone}%0A`;
    msg += `Address: ${address}%0A%0A`;

    cartItems.forEach((item, i) => {
      msg += `${i + 1}. ${item.name} (${item.size}) x ${
        item.quantity
      } = ₹${item.price * item.quantity}%0A`;
    });

    msg += `%0ATotal: ₹${total}`;

    window.open(
      `https://wa.me/8297860240?text=${msg}`,
      "_blank"
    );
  };

  return (
    <div style={styles.page}>
      <div style={styles.cartBox}>
        <h2 style={styles.heading}>🛒 My Cart</h2>

        {cartItems.length === 0 && (
          <p style={{ textAlign: "center", opacity: 0.7 }}>
            Your cart is empty
          </p>
        )}

        {cartItems.map((item) => (
          <div
            key={`${item.id}-${item.size}`}
            style={styles.cartItem}
          >
            <img
              src={item.image}
              alt={item.name}
              style={styles.image}
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/100x120?text=No+Image")
              }
            />

            <div style={styles.itemInfo}>
              <h4>{item.name}</h4>
              <p style={styles.meta}>Size: {item.size}</p>
              <p style={styles.price}>₹{item.price}</p>

              <div style={styles.qtyRow}>
                <button
                  style={styles.qtyBtn}
                  onClick={() => decreaseQty(item.id, item.size)}
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  style={styles.qtyBtn}
                  onClick={() => increaseQty(item.id, item.size)}
                >
                  +
                </button>
              </div>

              <button
                style={styles.removeBtn}
                onClick={() =>
                  removeFromCart(item.id, item.size)
                }
              >
                Remove
              </button>
            </div>

            <div style={styles.subtotal}>
              ₹{item.price * item.quantity}
            </div>
          </div>
        ))}

        {cartItems.length > 0 && (
          <>
            <div style={styles.summary}>
              <span>Total</span>
              <span style={styles.totalPrice}>₹{total}</span>
            </div>

            <h3 style={styles.subHeading}>
              Customer Details
            </h3>

            <input
              style={styles.input}
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              style={styles.input}
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <textarea
              style={styles.textarea}
              placeholder="Delivery Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <button
              style={styles.whatsappBtn}
              onClick={checkoutWhatsApp}
            >
              Checkout on WhatsApp 💬
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#000",
    padding: "40px 16px",
    display: "flex",
    justifyContent: "center"
  },

  cartBox: {
    width: "100%",
    maxWidth: 900,
    background: "#111",
    borderRadius: 16,
    padding: 30,
    color: "#fff"
  },

  heading: {
    textAlign: "center",
    marginBottom: 30
  },

  cartItem: {
    display: "grid",
    gridTemplateColumns: "100px 1fr auto",
    gap: 20,
    padding: 20,
    marginBottom: 16,
    background: "#181818",
    borderRadius: 12,
    alignItems: "center"
  },

  image: {
    width: 100,
    height: 120,
    objectFit: "cover",
    borderRadius: 8
  },

  itemInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 6
  },

  meta: { opacity: 0.7, fontSize: 14 },

  price: { fontWeight: "bold" },

  qtyRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginTop: 6
  },

  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    background: "#000",
    color: "#fff",
    border: "1px solid #444",
    cursor: "pointer"
  },

  removeBtn: {
    background: "none",
    border: "none",
    color: "#ff4d4d",
    cursor: "pointer",
    marginTop: 6
  },

  subtotal: { fontWeight: "bold" },

  summary: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 0",
    borderTop: "1px solid #333",
    marginTop: 20
  },

  totalPrice: {
    color: "#25D366",
    fontWeight: "bold"
  },

  subHeading: {
    marginTop: 30,
    marginBottom: 10
  },

  input: {
    width: "100%",
    padding: 12,
    marginTop: 10,
    borderRadius: 8,
    background: "#000",
    border: "1px solid #333",
    color: "#fff"
  },

  textarea: {
    width: "100%",
    padding: 12,
    marginTop: 10,
    borderRadius: 8,
    background: "#000",
    border: "1px solid #333",
    color: "#fff",
    minHeight: 80
  },

  whatsappBtn: {
    width: "100%",
    marginTop: 20,
    padding: 16,
    background: "#25D366",
    border: "none",
    borderRadius: 10,
    fontWeight: "bold",
    cursor: "pointer"
  }
};
