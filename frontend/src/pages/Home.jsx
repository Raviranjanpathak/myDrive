import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const toggleTheme = () => {
    const newTheme = document.body.className === "dark" ? "light" : "dark";
    document.body.className = newTheme;
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    }}>
      
      {/* 🔥 THEME TOGGLE BUTTON (TOP RIGHT) */}
      <div style={{
        position: "absolute",
        top: "20px",
        right: "20px"
      }}>
        <button
          onClick={toggleTheme}
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            background: "#4f46e5",
            color: "white"
          }}
        >
          {document.body.className === "dark" ? "☀️" : "🌙"}
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        textAlign: "center"
      }}>

        {/* TITLE */}
        <h1 style={{
          fontSize: "42px",
          fontWeight: "bold",
          marginBottom: "10px"
        }}>
          📁 My Drive
        </h1>

        <p style={{
          fontSize: "16px",
          color: document.body.className === "dark" ? "#cbd5f5" : "#555",
          marginBottom: "25px",
          maxWidth: "500px"
        }}>
          A modern cloud storage system to manage your folders, upload files, 
          and organize everything efficiently.
        </p>

        {/* BUTTONS */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "40px" }}>
          <button
            onClick={() => navigate("/login")}
            style={btnPrimary}
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            style={{
              ...btnOutline,
              background: document.body.className === "dark" ? "#1e293b" : "white",
              color: "#4f46e5"
            }}
          >
            Signup
          </button>
        </div>

        {/* FEATURES */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          width: "100%",
          maxWidth: "800px"
        }}>

          <div
            style={{
              ...cardStyle,
              background: document.body.className === "dark" ? "#1e293b" : "white",
              color: document.body.className === "dark" ? "#fff" : "#000"
            }}
            {...hover}
          >
            <h3>📂 Nested Folders</h3>
            <p>Create and manage folders inside folders easily.</p>
          </div>

          <div
            style={{
              ...cardStyle,
              background: document.body.className === "dark" ? "#1e293b" : "white",
              color: document.body.className === "dark" ? "#fff" : "#000"
            }}
            {...hover}
          >
            <h3>📤 File Upload</h3>
            <p>Upload images and organize them efficiently.</p>
          </div>

          <div
            style={{
              ...cardStyle,
              background: document.body.className === "dark" ? "#1e293b" : "white",
              color: document.body.className === "dark" ? "#fff" : "#000"
            }}
            {...hover}
          >
            <h3>🔐 Secure Access</h3>
            <p>JWT authentication ensures user-specific data.</p>
          </div>

        </div>

      </div>

      {/* FOOTER */}
      <div style={{
        width: "100%",
        padding: "15px",
        background: document.body.className === "dark" ? "#0f172a" : "#ffffff",
        borderTop: "1px solid #e5e7eb",
        textAlign: "center"
      }}>

        <h4 style={{ margin: "5px 0" }}>
          Raviranjan Pathak
        </h4>

        <p style={{
          fontSize: "13px",
          color: document.body.className === "dark" ? "#cbd5f5" : "#6b7280"
        }}>
          Full Stack Developer | MERN Stack
        </p>

        <div style={{
            marginTop: "8px",
            display: "flex",
            justifyContent: "center",
            gap: "15px"
            }}>

            <a 
                href="https://github.com/Raviranjanpathak"
                target="_blank"
                style={linkStyle}
            >
                💻 GitHub
            </a>

            <a 
                href="https://www.linkedin.com/in/raviranjan-pathak/"
                target="_blank"
                style={linkStyle}
            >
                💼 LinkedIn
            </a>

            <a 
                href="https://raviranjanpathak.github.io/portfolio/"
                target="_blank"
                style={linkStyle}
            >
                🌐 Portfolio
            </a>

        </div>

        <p style={{
          marginTop: "10px",
          fontSize: "12px",
          color: "#9ca3af"
        }}>
          © 2026 All rights reserved
        </p>

      </div>

    </div>
  );
}

/* STYLES */

const cardStyle = {
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
  transition: "0.3s"
};

const hover = {
  onMouseEnter: (e) => e.currentTarget.style.transform = "scale(1.05)",
  onMouseLeave: (e) => e.currentTarget.style.transform = "scale(1)"
};

const btnPrimary = {
  padding: "10px 22px",
  background: "#4f46e5",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

const btnOutline = {
  padding: "10px 22px",
  border: "1px solid #4f46e5",
  borderRadius: "8px",
  cursor: "pointer"
};

const linkStyle = {
  cursor: "pointer",
  fontSize: "14px",
  color: "#4f46e5"
};