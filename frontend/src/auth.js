// src/auth.js
import axios from "axios";

// ⭐ ADD THIS LINE HERE ⭐
axios.defaults.baseURL = "http://localhost:4000";

const TOKEN_KEY = "my_ecom_token_v1";

export function setToken(token) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem(TOKEN_KEY);
    delete axios.defaults.headers.common["Authorization"];
  }
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

// initialize axios header if token exists
const t = getToken();
if (t) axios.defaults.headers.common["Authorization"] = `Bearer ${t}`;
