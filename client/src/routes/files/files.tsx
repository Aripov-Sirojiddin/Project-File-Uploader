import { useEffect, useState } from "react";
import Folder from "../../components/folder/folder";
import styles from "./files.module.css";
import CreateFolderView from "../../components/createFolderView/createFolderView";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../../state/store";
import { type AppDispatch } from "../../state/store";
import { useNavigate } from "react-router-dom";
import { exitFileAsync, openFileAsync } from "../../state/path/pathSlice";

interface FolderType {
  id: string;
  name: string;
  size: number;
  date: number;
  type: string;
  ownerId: string;
  parentId: string;
}

const Files: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.value);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
    return;
  }
  const token: string = user.token;

  const [creatingFolder, setCreatingFolder] = useState(false);

  function createNewFolderForm() {
    setCreatingFolder(true);
  }

  //Get all the folders associated with the user.
  const files = useSelector((state: RootState) => state.path.files);
  
  useEffect(() => {
    dispatch(openFileAsync({ token, fileId: user.id }));
  }, []);

  //Prepare folders
  const [selectedFolderId, setSelectedFolderId] = useState("");

  const foldersView = files.map((folder: FolderType) => (
    <div key={folder.id}>
      <Folder
        folderData={folder}
        selectedFolderId={selectedFolderId}
        setSelectedFolderId={setSelectedFolderId}
      />
    </div>
  ));

  //Leave current folder
  function upAFolder() {
    dispatch(exitFileAsync({ token }));
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
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Files;
