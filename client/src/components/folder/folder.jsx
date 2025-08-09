import { useEffect, useRef, useState } from "react";
import styles from "./folder.module.css";

export default function Folder({
  key,
  folderData,
  selectedFolderId,
  setSelectedFolderId,
}) {
  const folderRef = useRef(null);
  useEffect(() => {
    function removeFolderHighlight() {
      setSelectedFolderId("");
    }
    function highlightFolder() {
      setSelectedFolderId(folderData.id);
    }

    function openFolder() {
      console.log(folderData.name);
    }

    const folderDiv = folderRef.current;

    if (folderDiv) {
      folderDiv.addEventListener("click", highlightFolder);
      folderDiv.addEventListener("dblclick", openFolder);
      window.addEventListener("mousedown", removeFolderHighlight);
    }

    return () => {
      if (folderDiv) {
        folderDiv.removeEventListener("click", highlightFolder);
        folderDiv.removeEventListener("dblclick", openFolder);
        window.removeEventListener("mousedown", removeFolderHighlight);
      }
    };
  }, []);
  return (
    <div
      ref={folderRef}
      key={folderData.id}
      id={`folder-${folderData.id}`}
      className={selectedFolderId == folderData.id ? styles.selected : ""}
    >
      <p>{folderData.name}</p>
    </div>
  );
}
