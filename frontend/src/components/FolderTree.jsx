import { useState } from "react";

export default function FolderTree({ folders, parent = null }) {
  const [openFolders, setOpenFolders] = useState({});

  const toggle = (id) => {
    setOpenFolders((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const formatSize = (size) => {
    if (!size) return "0 KB";
    return size > 1024
      ? (size / 1024).toFixed(2) + " KB"
      : size + " B";
  };

  const filtered = folders.filter((f) => {
    const parentId = f.parent ? String(f.parent) : null;
    return parentId === parent;
  });

  return (
    <div style={{ marginLeft: parent ? "20px" : "0px" }}>
      {filtered.map((folder) => (
        <div key={folder._id}>

          <div
            onClick={() => toggle(folder._id)}
            style={{
              cursor: "pointer",
              padding: "6px 10px",
              background: document.body.className === "dark" ? "#334155" : "#f1f5f9",
              color: document.body.className === "dark" ? "#fff" : "#000",
              borderRadius: "6px",
              marginBottom: "4px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <span>
              {openFolders[folder._id] ? "📂" : "📁"} {folder.name}
            </span>

            <span style={{
                fontSize: "12px",
                color: document.body.className === "dark" ? "#cbd5f5" : "#555"
              }}>
              {formatSize(folder.size)}
            </span>
          </div>

          {openFolders[folder._id] && (
            <FolderTree
              folders={folders}
              parent={String(folder._id)}
            />
          )}
        </div>
      ))}
    </div>
  );
}