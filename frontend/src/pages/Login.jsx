import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

const handleSubmit = async () => {
  try {
    const res = await API.post("/auth/login", {
      email: form.email,
      password: form.password
    });
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.className = savedTheme;
    localStorage.setItem("token", res.data.token);
    toast.success("Login successful 🎉");

    window.location.href = "/dashboard";

  } catch (err) {
    toast.error(err.response?.data?.msg || "Login failed ❌");
  }
};

 return (
  <div className="container">
    <h2 style={{ textAlign: "center" }}>Login</h2>

    <input
      placeholder="Email"
      onChange={(e) => setForm({ ...form, email: e.target.value })}
    />

    <input
      type="password"
      placeholder="Password"
      onChange={(e) => setForm({ ...form, password: e.target.value })}
    />

    <button onClick={handleSubmit}>Login</button>
  </div>
);
}