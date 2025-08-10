import { useEffect, useRef, useState } from "react";
import styles from "./folder.module.css";

interface Folder {
  id: string;
  name: string;
  size: number;
  date: number;
  type: string;
  ownerId: string;
  parentId: string;
}

interface FolderProps {
  folderData: Folder;
  setParentId: React.Dispatch<React.SetStateAction<string[]>>;
  selectedFolderId: string;
  setSelectedFolderId: React.Dispatch<React.SetStateAction<string>>;
}
const Folder: React.FC<FolderProps> = ({
  folderData,
  setParentId,
  selectedFolderId,
  setSelectedFolderId,
}) => {
  const folderRef = useRef<HTMLDivElement | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  function resetFolder() {
    setSelectedFolderId("");
    setIsEdit(false);
  }
  function selectFolder() {
    setSelectedFolderId(folderData.id);
  }
  function editFolder() {
    setIsEdit(true);
  }
  function openFolder() {
    setParentId((history) => [...(history || []), folderData.id]);
  }

  function formatText(text: string) {
    return text.split("\n").map((line: string, i: number) => (
      <span key={`${line}-${i}`}>
        {line}
        <br />
      </span>
    ));
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
      key={`folder-${folderData.id}`}
      id={`folder-${folderData.id}`}
      className={`
        ${styles.folder}        
        ${selectedFolderId == folderData.id && styles.selected}
      `}
    >
      <img
        src={folderData.size === 0 ? "/empty-folder.svg" : "folder.svg"}
        alt={
          folderData.size === 0 ? "Empty Folder icon" : "Folder with items icon"
        }
      />
      <p onClick={editFolder} className={`${isEdit && styles.edit}`}>
        {formatText(folderData.name)}
      </p>
    </div>
  );
};

export default Folder;
