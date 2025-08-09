import { useEffect, useRef, useState } from "react";
import styles from "./folder.module.css";

export default function Folder({
  key,
  folderData,
  selectedFolderId,
  setSelectedFolderId,
}) {
  const folderRef = useRef(null);
  const [isEdit, setIsEdit] = useState(false);

  function resetFolder(e) {
    setSelectedFolderId(-1);
    setIsEdit(false);
  }
  function selectFolder() {
    setSelectedFolderId(folderData.id);
  }
  function editFolder() {
    setIsEdit(true);
  }
  function openFolder() {
    console.log(folderData.name);
  }

  useEffect(() => {
    const folderDiv = folderRef.current;

    if (folderDiv) {
      folderDiv.addEventListener("click", selectFolder);
      folderDiv.addEventListener("dblclick", openFolder);
      window.addEventListener("mousedown", resetFolder);
    }

    return () => {
      if (folderDiv) {
        folderDiv.removeEventListener("click", selectFolder);
        folderDiv.removeEventListener("dblclick", openFolder);
        window.removeEventListener("mousedown", resetFolder);
      }
    };
  }, []);
  return (
    <div
      ref={folderRef}
      key={folderData.id}
      id={`folder-${folderData.id}`}
      className={`
        ${styles.folder}        
        ${selectedFolderId == folderData.id && styles.selected}
      `}
    >
      <img
        src={folderData.size === 0 ? "/empty-folder.svg" : "folder.svg"}
        alt={folderData.size === 0 ? "Empty Folder icon" : "Folder with items icon"}
      />
      <p
        onClick={editFolder}
        className={`
        ${isEdit && styles.edit}
      `}
      >
        {folderData.name}
      </p>
    </div>
  );
}
