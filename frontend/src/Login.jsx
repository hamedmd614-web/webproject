// src/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setToken } from "./auth";

/**
 * Login page (token-based auth)
 *
 * Notes:
 * - Adjust the POST URL (/login) to match your backend route.
 * - After successful login this calls setToken(token) which stores the token
 *   and sets axios default Authorization header (per your auth.js).
 * - We reload the page so App.jsx (which reads token on mount) updates user state.
 */

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // perform API call and store token
  async function handleLogin(emailVal, passwordVal) {
    // adjust URL to your backend (example: http://localhost:5000/api/auth/login)
    const res = await axios.post("/login", {
      email: emailVal,
      password: passwordVal,
    });
    // expecting { token: "..." } in response body
    const token = res?.data?.token;
    if (!token) throw new Error("No token returned from server");
    // optionally handle remember flag here (you could persist differently)
    setToken(token);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    // small client-side validation
    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);
    try {
      await handleLogin(email.trim(), password);
      // navigate home and reload to let App pick up token/getCurrentUser
      navigate("/");
      // reload ensures any top-level hooks re-run and show logged-in UI
      window.location.reload();
    } catch (err) {
      // read message from axios error if present
      const msg =
        err?.response?.data?.message || err?.response?.data || err.message || String(err);
      setError(msg);
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 480, margin: "40px auto", padding: 16 }}>
      <h2 style={{ marginBottom: 12 }}>Login</h2>

      <form onSubmit={handleSubmit}>
        {error && (
          <div style={{ color: "white", background: "#f44336", padding: 8, marginBottom: 12 }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: 10 }}>
          <label style={{ display: "block", marginBottom: 6 }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
            style={{ width: "100%", padding: 10, boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label style={{ display: "block", marginBottom: 6 }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            style={{ width: "100%", padding: 10, boxSizing: "border-box" }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <input
            id="remember"
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          <label htmlFor="remember">Remember me</label>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "10px 16px",
              border: "none",
              background: "#1976d2",
              color: "white",
              cursor: loading ? "default" : "pointer",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>

      <div style={{ marginTop: 12 }}>
        <small>
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            style={{ color: "#1976d2", background: "transparent", border: "none", cursor: "pointer" }}
          >
            Register
          </button>
        </small>
      </div>
    </div>
  );
}
