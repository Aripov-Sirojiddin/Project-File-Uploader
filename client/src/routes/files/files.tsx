import { useEffect, useState } from "react";
import Folder from "../../components/folder/folder";
import styles from "./files.module.css";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../../state/store";
import { type AppDispatch } from "../../state/store";
import { useNavigate } from "react-router-dom";
import { exitFileAsync, openFileAsync } from "../../state/path/pathSlice";
import CreateOrUpdateFolder from "../../components/createOrUpdateFolder/createOrUpdateFolder";
import { resetSelectedFile } from "../../state/selectedFile/selectedFileSlice";

const Files: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.value);
  const navigate = useNavigate();
  if (!user) {
    navigate("/");
    return;
  }
  const files = useSelector((state: RootState) => state.path.files);
  const selectedFile = useSelector((state: RootState) => state.selectedFile);
  const dispatch = useDispatch<AppDispatch>();
  const token: string = user.token;
  const [creatingFolder, setCreatingFolder] = useState(false);

  function createNewFolderForm() {
    dispatch(resetSelectedFile());
    setCreatingFolder(true);
  }

  useEffect(() => {
    dispatch(openFileAsync({ token, fileId: user.id }));
  }, []);

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
            {files.map((folder) => (
              <div key={folder.id}>
                {selectedFile.edit && selectedFile.id === folder.id ? (
                  <CreateOrUpdateFolder setCreatingFolder={setCreatingFolder} />
                ) : (
                  <Folder folderData={folder} />
                )}
              </div>
            ))}
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
