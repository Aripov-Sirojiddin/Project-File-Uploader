import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
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

  function createNewFolderForm() {
    setCreatingFolder(true);
  }

  async function createFolder(form) {
    const folderName = Object.fromEntries(form).name;
    if (folderName === "") {
      setError("Folder Name can't be blank");
      setModalState(true);
      return;
    }
    const response = await axios.post(
      `${import.meta.env.VITE_URL}/folder/create`,
      {
        name: folderName,
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
                <input type="text" name="name" id="name" />
                <button type="submit">Create</button>
              </form>
            </>
          )}
          <a onClick={createNewFolderForm}>Create folder</a>
        </>
      )}
    </div>
  );
}
