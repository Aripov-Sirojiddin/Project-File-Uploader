import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Modal from "react-modal";

export default function Files({ token }) {
  const [user, setUser] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [parentId, setParentId] = useState(jwtDecode(token).id);

  const decodedToken = jwtDecode(token);

  useEffect(() => {
    getUser();
  }, []);

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

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  async function createFolder(form) {
    const folderName = Object.fromEntries(form).name;
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

    console.log(response.data);
    //TODO : Flash message to user that folder was created successfully
    closeModal();
  }
  return (
    <>
      <h1>Files</h1>
      {user && (
        <>
          <p>Welcome back {user.name}!</p>
          <Modal isOpen={modalIsOpen}>
            <form action={createFolder}>
              <input type="text" name="name" id="name" />
              <button type="submit">Create</button>
            </form>
          </Modal>
          <a onClick={openModal}>Create folder</a>
        </>
      )}
    </>
  );
}
