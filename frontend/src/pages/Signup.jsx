import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Signup() {
  const [form, setForm] = useState({ name:"", email:"", password:"" });
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

const handleSubmit = async () => {
  try {
    await API.post("/auth/signup", {
      email: form.email,
      password: form.password
    });

    toast.success("Signup successful 🎉");
    const savedTheme = localStorage.getItem("theme") || "light";
document.body.className = savedTheme;
    navigate("/login");

  } catch (err) {
    toast.error(err.response?.data?.msg || "Signup failed ❌");
  }
};

  return (
  <div className="container">
    <h2 style={{ textAlign: "center" }}>Signup</h2>

    <input placeholder="Name" onChange={(e)=>setForm({...form,name:e.target.value})}/>
    <input placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})}/>
    <input type="password" placeholder="Password" onChange={(e)=>setForm({...form,password:e.target.value})}/>

    <button onClick={handleSubmit}>Signup</button>
  </div>
);
}