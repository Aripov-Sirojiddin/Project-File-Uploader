import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useRef, useState } from "react";
import Folder from "../../components/folder/folder";
import styles from "./files.module.css";
import CreateFolderView from "../../components/createFolderView/createFolderView";

export default function Files({ token }) {
  const [user, setUser] = useState();
  const [creatingFolder, setCreatingFolder] = useState(false);
  const [parentIdHistory, setParentId] = useState([jwtDecode(token).id]);

  const decodedToken = jwtDecode(token);

  async function getUser() {
    const response = await axios.get(
      `${import.meta.env.VITE_URL}/user/${decodedToken.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setUser(response.data.user);
  }

  function createNewFolderForm() {
    setCreatingFolder(true);
  }

  //Get all the folders associated with the user.
  const [folders, setFolders] = useState([]);
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
    getUser();
    getFolders();
  }, []);

  //Prepare folders
  const [selectedFolderId, setSelectedFolderId] = useState("");

  const foldersView = folders.map((folder) => (
    <div key={folder.id}>
      <Folder
        folderData={folder}
        parentId={parentIdHistory}
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
                token={token}
                user={user}
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
}
