import React from 'react'
import { Toaster } from "react-hot-toast";
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
const savedTheme = localStorage.getItem("theme") || "light";
document.body.className = savedTheme;

ReactDOM.createRoot(document.getElementById('root')).render(
   <>
    <App />
    <Toaster 
      position="top-right"
      toastOptions={{
        style: {
          background: "#1e293b",
          color: "#fff"
        }
      }}
    />
  </>
)