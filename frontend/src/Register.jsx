// src/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setToken } from "./auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleRegister(emailVal, passwordVal) {
    const res = await axios.post("/register", {
      email: emailVal,
      password: passwordVal,
    });

    const token = res?.data?.token;
    if (!token) throw new Error("No token returned from server");
    setToken(token);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await handleRegister(email, password);
      navigate("/");
      window.location.reload();
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data ||
        err.message ||
        String(err);
      setError(msg);
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 480, margin: "40px auto", padding: 16 }}>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        {error && (
          <div style={{ background: "#f44336", color: "white", padding: 8 }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: 10 }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={{ width: "100%", padding: 10 }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            style={{ width: "100%", padding: 10 }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 16px",
            background: "#1976d2",
            color: "white",
            border: "none",
          }}
        >
          {loading ? "Creating..." : "Register"}
        </button>
      </form>

      <div style={{ marginTop: 12 }}>
        <small>
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            style={{ background: "transparent", border: "none", color: "#1976d2" }}
          >
            Login
          </button>
        </small>
      </div>
    </div>
  );
}
