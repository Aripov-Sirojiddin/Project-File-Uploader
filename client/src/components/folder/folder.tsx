import { useEffect, useRef } from "react";
import styles from "./folder.module.css";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../state/store";
import type { AppDispatch } from "../../state/store";
import { openFileAsync } from "../../state/path/pathSlice";
import { useNavigate } from "react-router-dom";
import {
  resetSelectedFile,
  setSelectedFile,
} from "../../state/selectedFile/selectedFileSlice";

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
}

const Folder: React.FC<FolderProps> = ({ folderData }) => {
  const user = useSelector((state: RootState) => state.user.value);
  const selectedFile = useSelector((state: RootState) => state.selectedFile);
  const navigate = useNavigate();
  if (!user) {
    navigate("/");
    return;
  }

  const dispatch = useDispatch<AppDispatch>();

  const folderRef = useRef<HTMLDivElement | null>(null);

  function selectFolder() {
    dispatch(
      setSelectedFile({ id: folderData.id, name: folderData.name, edit: false })
    );
  }
  function editFolder() {
    dispatch(
      setSelectedFile({ id: folderData.id, name: folderData.name, edit: true })
    );
  }
  function openFolder() {
    if (!user) {
      navigate("/");
      return;
    }
    dispatch(openFileAsync({ token: user.token, fileId: folderData.id }));
  }
  function resetFolder() {
    dispatch(resetSelectedFile());
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
        ${selectedFile.id == folderData.id && styles.selected}
      `}
    >
      <img
        src={folderData.size === 0 ? "/empty-folder.svg" : "folder.svg"}
        alt={
          folderData.size === 0 ? "Empty Folder icon" : "Folder with items icon"
        }
      />
      <p onClick={editFolder}>{formatText(folderData.name)}</p>
    </div>
  );
};

export default Folder;
