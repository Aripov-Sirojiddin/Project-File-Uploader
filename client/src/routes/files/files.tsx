import axios from "axios";
import { useEffect, useState } from "react";
import Folder from "../../components/folder/folder";
import styles from "./files.module.css";
import CreateFolderView from "../../components/createFolderView/createFolderView";
import { useSelector } from "react-redux";
import type { RootState } from "../../state/store";
import { useNavigate } from "react-router-dom";

interface FolderType {
  id: string;
  name: string;
  size: number;
  date: number;
  type: string;
  ownerId: string;
  parentId: string;
}

interface FilesProps {
  token: string;
}

const Files: React.FC<FilesProps> = ({ token }) => {
  const user = useSelector((state: RootState) => state.user.value);
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
    return;
  }

  const [creatingFolder, setCreatingFolder] = useState(false);
  const [parentIdHistory, setParentId] = useState<string[]>([user.id]);

  function createNewFolderForm() {
    setCreatingFolder(true);
  }

  //Get all the folders associated with the user.
  const [folders, setFolders] = useState<Folder[]>([]);
  async function getFolders() {
    const response = await axios.get(
      `${import.meta.env.VITE_URL}/folder/${
        parentIdHistory[parentIdHistory.length - 1]
      }`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setFolders(response.data.folders);
  }

  useEffect(() => {
    getFolders();
  }, []);

  //Prepare folders
  const [selectedFolderId, setSelectedFolderId] = useState("");

  const foldersView = folders.map((folder: FolderType) => (
    <div key={folder.id}>
      <Folder
        folderData={folder}
        setParentId={setParentId}
        selectedFolderId={selectedFolderId}
        setSelectedFolderId={setSelectedFolderId}
      />
    </div>
  ));

  useEffect(() => {
    getFolders();
  }, [parentIdHistory]);

  function upAFolder() {
    setParentId((history) => {
      const newHistory = [...history];
      if (newHistory.length > 1) {
        newHistory.pop();
      }
      return newHistory;
    });
  }

  return (
    <div id="files-page">
      <h1>Files</h1>
      {user && (
        <>
          <p>Welcome back {user.name}!</p>
          <a onClick={createNewFolderForm}>Create folder</a>
          <button onClick={upAFolder}>Up a folder</button>
          <div className={styles.grid}>
            {foldersView}
            {creatingFolder && (
              <CreateFolderView
                oldName=""
                creatingFolder={creatingFolder}
                setCreatingFolder={setCreatingFolder}
                parentIdHistory={parentIdHistory}
                setFolders={setFolders}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Files;
