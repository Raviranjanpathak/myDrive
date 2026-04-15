import { useEffect, useState } from "react";
import API from "../api/axios";
import FolderTree from "../components/FolderTree";
import UploadForm from "../components/UploadForm";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [folders, setFolders] = useState([]);
  const [folderName, setFolderName] = useState("");
  const [parent, setParent] = useState(null);
  const [files, setFiles] = useState([]);

  //  PROTECT ROUTE
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    }
  }, []);

  //  FETCH FOLDERS
  const fetchFolders = async () => {
  try {
    const res = await API.get("/folders");
    setFolders(Array.isArray(res.data) ? res.data : []);
  } catch (err) {
    console.error(err);
    setFolders([]);
  }
};

  //  FETCH FILES
  const fetchFiles = async () => {
  try {
    const res = await API.get("/files");
    setFiles(Array.isArray(res.data) ? res.data : []);
  } catch (err) {
    console.error(err);
    setFiles([]);
  }
};

  //  CREATE FOLDER
  const createFolder = async () => {
    if (!folderName) {
    toast.error("Please enter folder name 📁");
    return;
  }

    await API.post("/folders", {
      name: folderName,
      parent: parent || null
    });

    setFolderName("");
    setParent(null);
    fetchFolders();
  };

  //  LOAD DATA
  useEffect(() => {
    fetchFolders();
    fetchFiles();
  }, []);

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh" }}>
      <Navbar />

      <div style={{
        padding: "30px",
        maxWidth: "1100px",
        margin: "auto"
      }}>

        {/* HEADER */}
        <h2 style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "25px"
        }}>
          📁 My Drive
        </h2>

        {/* CREATE FOLDER CARD */}
        <div style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          marginBottom: "25px"
        }}>
          <div style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            width: "100%"
          }}>
            <input
  placeholder="Enter folder name"
  value={folderName}
  onChange={(e) => setFolderName(e.target.value)}
  style={{
    flex: 3,                    
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc"
  }}
/>

<select
  value={parent || ""}
  onChange={(e) => setParent(e.target.value)}
  style={{
    flex: 1,
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc"
  }}
>
  <option value="">Root</option>
  {folders.map((f) => (
    <option key={f._id} value={f._id}>
      {f.name}
    </option>
  ))}
</select>

<button
  onClick={createFolder}
  style={{
    flex: 1,
    padding: "12px",
    // background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    maxWidth: "120px"   
  }}
>
  Create
</button>
          </div>
        </div>

        {/* FOLDER TREE */}
        <div style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          marginBottom: "25px"
        }}>
          <h3 style={{ marginBottom: "10px" }}>📂 Folders</h3>
          <FolderTree folders={folders} />
        </div>

        {/* UPLOAD */}
        <div style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          marginBottom: "25px"
        }}>
          <h3 style={{ marginBottom: "10px" }}>📤 Upload Image</h3>
          <UploadForm folders={folders} />
        </div>

        {/* FILES */}
        <div style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
        }}>
          <h3 style={{ marginBottom: "15px" }}>🖼️ Uploaded Files</h3>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: "15px"
          }}>
            {files.map((file) => (
              <div key={file._id} style={{
                background: "#f1f5f9",
                padding: "10px",
                borderRadius: "10px",
                textAlign: "center",
                transition: "0.2s"
              }}>
                <img
                 src={`http://localhost:5000/uploads/${file.path}`}
                  alt=""
                  style={{
                    width: "100%",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "8px"
                  }}
                />

                <p style={{
                  fontSize: "12px",
                  marginTop: "6px"
                }}>
                  {file.name}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}