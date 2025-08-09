import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import Folder from "../../components/folder/folder";
import styles from "./files.module.css";

export default function Files({ token }) {
  const [user, setUser] = useState();
  const [creatingFolder, setCreatingFolder] = useState(false);
  const [showModal, setModalState] = useState(false);
  const [error, setError] = useState("");
  const [parentIdHistory, setParentId] = useState([jwtDecode(token).id]);

  const decodedToken = jwtDecode(token);

  function closeModal() {
    setModalState(false);
  }

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

  //Submit form if the user clicks in the window
  const [folderName, setFolderName] = useState("New Folder");
  const inputReference = useRef(null);

  function handleOnChange(e) {
    setFolderName(e.target.value);
  }
  function createNewFolderForm() {
    setCreatingFolder(true);
  }

  async function createFolder() {
    const name = inputReference.current.value;
    if (name === "") {
      setError("Folder Name can't be blank");
      setModalState(true);
      return;
    }
    const response = await axios.post(
      `${import.meta.env.VITE_URL}/folder/create`,
      {
        name: name,
        parentId: parentIdHistory[parentIdHistory.length - 1],
        userId: user.id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setCreatingFolder(false);
    setFolders((oldFolders) => [...oldFolders, response.data.folder]);
  }
  //Handles clicks outside the input field to submit form that creates folders.
  useEffect(() => {
    function handleClick(e) {
      if (!creatingFolder || inputReference.current.contains(e.target)) {
        return;
      }
      createFolder();
    }

    window.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  }, [creatingFolder]);

  //Get all the folders associated with the user.
  const [folders, setFolders] = useState([]);
  async function getFolders() {
    console.log(`Parent id : ${parentIdHistory}`);
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
    Modal.setAppElement("#files-page");
    getUser();
    getFolders();
  }, []);

  //Prepare folders
  const [selectedFolderId, setSelectedFolderId] = useState(-1);

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
              <>
                <Modal isOpen={showModal}>
                  <p>{error}</p>
                  <button onClick={closeModal}>Dismiss</button>
                </Modal>
                <form action={createFolder}>
                  <input
                    type="text"
                    name="folderName"
                    id="folderName"
                    ref={inputReference}
                    value={folderName}
                    onChange={handleOnChange}
                  />
                </form>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
