import { useEffect, useState } from "react";
import Folder from "../../components/folder/folder";
import styles from "./files.module.css";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../../state/store";
import { type AppDispatch } from "../../state/store";
import { useNavigate } from "react-router-dom";
import { exitFileAsync, openFileAsync } from "../../state/path/pathSlice";
import CreateOrUpdateFolder from "../../components/createOrUpdateFolder/createOrUpdateFolder";

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
  const editFileId = useSelector((state: RootState) => state.editFile.id);

  const foldersView = files.map((folder: FolderType) => (
    <div key={folder.id}>
      {editFileId === folder.id ? (
        <CreateOrUpdateFolder setCreatingFolder={setCreatingFolder} />
      ) : (
        <Folder
          folderData={folder}
          selectedFolderId={selectedFolderId}
          setSelectedFolderId={setSelectedFolderId}
        />
      )}
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
              <CreateOrUpdateFolder setCreatingFolder={setCreatingFolder} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Files;
