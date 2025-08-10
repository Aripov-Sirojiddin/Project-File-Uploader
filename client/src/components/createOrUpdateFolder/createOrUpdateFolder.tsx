import { useState } from "react";
import folderStyle from "../../components/folder/folder.module.css";
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../../state/store";
import { type AppDispatch } from "../../state/store";
import { useNavigate } from "react-router-dom";
import {
  createFileAsync,
  updateFileNameAsync,
} from "../../state/path/pathSlice";
import { resetEditFile, setEditFile } from "../../state/editFile/editFileSlice";

interface CreateOrUpdateFolderViewProps {
  setCreatingFolder: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateOrUpdateFolder: React.FC<CreateOrUpdateFolderViewProps> = ({
  setCreatingFolder,
}) => {
  const user = useSelector((state: RootState) => state.user.value);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const fileId = useSelector((state: RootState) => state.editFile.id);
  const folderName = useSelector((state: RootState) => state.editFile.name);
  if (!user) {
    navigate("/");
    return;
  }

  const token = user.token;

  const [error, setError] = useState("");
  const inputReference = useRef<HTMLTextAreaElement>(null);

  //Handles clicks outside the input field to submit form that creates folders.
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as Node;
      if (inputReference.current && inputReference.current.contains(target)) {
        return;
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

    if (inputReference.current) {
      inputReference.current.focus();
      inputReference.current.select();
    }

    resizeBox();
    window.addEventListener("input", resizeBox);
    window.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("mousedown", handleClick);
      window.removeEventListener("input", resizeBox);
    };
  }, []);

  function handleOnChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (e.target) {
      dispatch(setEditFile({ id: fileId, name: e.target.value }));
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
    //If fileId is present means we are updating
    if (fileId) {
      dispatch(
        updateFileNameAsync({
          fileId: fileId,
          newName: name,
          token: token,
        })
      );
      dispatch(resetEditFile());
    } else {
      //If fileId is not present we are creating
      dispatch(
        createFileAsync({
          fileName: name,
          userId: user.id,
          token: token,
          type: "folder",
        })
      );
    }
    setCreatingFolder(false);
  }

  return (
    <div className={`${folderStyle.folder} ${folderStyle.selected}`}>
      {error.length > 0 && <p>{error}</p>}
      <img src="/empty-folder.svg" alt="Empty folder icon." />
      <form>
        <textarea
          name="folderName"
          rows={1}
          id="folderName"
          ref={inputReference}
          onChange={handleOnChange}
          value={folderName != null ? folderName : "New Folder"}
        ></textarea>
      </form>
    </div>
  );
};

export default CreateOrUpdateFolder;
