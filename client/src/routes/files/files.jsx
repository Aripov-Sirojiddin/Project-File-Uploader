import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";

export default function Files({ token }) {
  const [user, setUser] = useState();
  const [creatingFolder, setCreatingFolder] = useState(false);
  const [showModal, setModalState] = useState(false);
  const [error, setError] = useState("");
  const [parentId, setParentId] = useState(jwtDecode(token).id);

  const decodedToken = jwtDecode(token);

  useEffect(() => {
    Modal.setAppElement("#files-page");
    getUser();
  }, []);

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

  function handleOnChange(e) {
    setFolderName(e.target.value);
  }
  function createNewFolderForm() {
    setCreatingFolder(true);
  }

  async function createFolder() {
    console.log(inputReference.current);
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
        parentId: parentId,
        userId: user.id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setCreatingFolder(false);
  }

  return (
    <div id="files-page">
      <h1>Files</h1>
      {user && (
        <>
          <p>Welcome back {user.name}!</p>
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
          <a onClick={createNewFolderForm}>Create folder</a>
        </>
      )}
    </div>
  );
}
