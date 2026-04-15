import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("theme");
  document.body.className = "light";
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        background: "#4f46e5",
        color: "white"
      }}
    >
      <h3 style={{ margin: 0 }}>📁 My Drive</h3>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <button
          onClick={toggleTheme}
          style={{
            background: "#ffffff22",
            border: "none",
            fontSize: "18px",
            cursor: "pointer",
            padding: "6px",
            borderRadius: "50%"
          }}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        <button
          onClick={handleLogout}
          style={{
            padding: "6px 12px",
            borderRadius: "6px",
            border: "none",
            background: "white",
            color: "#4f46e5",
            cursor: "pointer",
            fontSize: "13px"
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}