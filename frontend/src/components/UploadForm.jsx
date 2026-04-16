import { useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";

export default function UploadForm({ folders, fetchFiles }) {  
  const [file, setFile] = useState(null);
  const [folder, setFolder] = useState("");         

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", file);
    if (folder) {
  formData.append("folder", folder);
}

    await API.post("/files/upload", formData);
    toast.success("Uploaded 🎉");
    // window.location.reload(); 
    if (fetchFiles) {
  fetchFiles();
}
  };

  return (
    <div style={{
      display: "flex",
      gap: "10px",
      marginTop: "10px"
    }}>
      
      <input 
        type="file" 
        onChange={(e)=>setFile(e.target.files[0])}
      />

      {/* 👇 ADD THIS DROPDOWN */}
      <select onChange={(e) => setFolder(e.target.value)}>
        <option value="">Root</option>
        {folders.map((f) => (
          <option key={f._id} value={f._id}>
            {f.name}
          </option>
        ))}
      </select>

      <button onClick={handleUpload}>Upload</button>
      
    </div>
    
  );
}