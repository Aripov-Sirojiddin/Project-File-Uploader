import { useState } from "react";
import Modal from "react-modal";
import folderStyle from "../../components/folder/folder.module.css";
import { useEffect } from "react";
import { useRef } from "react";
import axios from "axios";

export default function CreateFolderView({
  token,
  user,
  creatingFolder,
  setCreatingFolder,
  parentIdHistory,
  setFolders,
}) {
  const [error, setError] = useState("");
  const [showModal, setModalState] = useState(false);
  const [folderName, setFolderName] = useState("New Folder");
  const inputReference = useRef(null);

  useEffect(() => {
    Modal.setAppElement("#files-page");
  }, []);
  //Handles clicks outside the input field to submit form that creates folders.
  useEffect(() => {
    function handleClick(e) {
      if (!creatingFolder || inputReference.current.contains(e.target)) {
        return;
      }
      createFolder();
    }
    function resizeBox(e) {
      inputReference.current.style.height = "auto";
      inputReference.current.style.height =
        inputReference.current.scrollHeight + "px";
    }
    if (creatingFolder) {
      inputReference.current.focus();
      inputReference.current.select();
      window.addEventListener("input", resizeBox);
    }
    window.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("mousedown", handleClick);
      window.removeEventListener("input", resizeBox);
    };
  }, [creatingFolder]);

  function handleOnChange(e) {
    setFolderName(e.target.value);
  }
  function closeModal() {
    setModalState(false);
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
    setFolderName(() => "New Folder");
    setFolders((oldFolders) => [...oldFolders, response.data.folder]);
  }

  return (
    <div className={folderStyle.folder}>
      <Modal isOpen={showModal}>
        <p>{error}</p>
        <button onClick={closeModal}>Dismiss</button>
      </Modal>
      <img src="/empty-folder.svg" alt="Empty folder icon." />
      <form action={createFolder}>
        <textarea
          type="text"
          name="folderName"
          rows={1}
          id="folderName"
          ref={inputReference}
          onChange={handleOnChange}
          value={folderName}
        ></textarea>
      </form>
    </div>
  );
}
