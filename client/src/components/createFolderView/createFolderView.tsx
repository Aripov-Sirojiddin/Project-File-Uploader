import { useState } from "react";
import folderStyle from "../../components/folder/folder.module.css";
import { useEffect } from "react";
import { useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import type { RootState } from "../../state/store";
import { useNavigate } from "react-router-dom";

interface CreateFolderViewProps {
  creatingFolder: boolean;
  oldName: string;
  setCreatingFolder: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateFolderView: React.FC<CreateFolderViewProps> = ({
  creatingFolder,
  setCreatingFolder,
  oldName,
}) => {
  const user = useSelector((state: RootState) => state.user.value);
  const path = useSelector((state: RootState) => state.path.absolutePath);

  const navigate = useNavigate();

  if (!user) {
    navigate("/");
    return;
  }

  const token = user.token;

  const [error, setError] = useState("");
  const [folderName, setFolderName] = useState(
    oldName ? oldName : "New Folder"
  );
  const inputReference = useRef<HTMLTextAreaElement>(null);

  //Handles clicks outside the input field to submit form that creates folders.
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as Node;
      if (inputReference.current) {
        if (!creatingFolder || inputReference.current.contains(target)) {
          return;
        }
      }
      createFolder();
    }
    function resizeBox() {
      if (inputReference.current) {
        inputReference.current.style.height = "auto";
        inputReference.current.style.height =
          inputReference.current.scrollHeight + "px";
      }
    }
    if (creatingFolder) {
      if (inputReference.current) {
        inputReference.current.focus();
        inputReference.current.select();
      }
      window.addEventListener("input", resizeBox);
    }
    window.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("mousedown", handleClick);
      window.removeEventListener("input", resizeBox);
    };
  }, [creatingFolder]);

  function handleOnChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (e.target) {
      setFolderName(e.target.value);
    }
  }

  async function createFolder() {
    if (!user) {
      navigate("/");
      return;
    }
    const name = inputReference.current
      ? inputReference.current.value.trim()
      : "";
    if (name === "") {
      setError("Folder Name can't be blank");
      return;
    }
    const response = await axios.post(
      `${import.meta.env.VITE_URL}/folder/create`,
      {
        name: name,
        parentId: path[path.length - 1],
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
  }

  return (
    <div className={folderStyle.folder}>
      {error.length > 0 && <p>{error}</p>}
      <img src="/empty-folder.svg" alt="Empty folder icon." />
      <form action={createFolder}>
        <textarea
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
};

export default CreateFolderView;
