import { useEffect, useRef } from "react";

export default function Folder({ key, folderData }) {
  const folderRef = useRef(null);
  useEffect(() => {
    function highlightFolder() {
      folderDiv.style.backgroundColor = "#00ffff";
    }

    function openFolder() {
      console.log(folderData.name);
    }

    const folderDiv = folderRef.current;

    if (folderDiv) {
      folderDiv.addEventListener("click", highlightFolder);
      folderDiv.addEventListener("dblclick", openFolder);
    }

    return () => {
      if (folderDiv) {
        folderDiv.removeEventListener("click", highlightFolder);
        folderDiv.removeEventListener("dblclick", openFolder);
      }
    };
  }, []);
  return (
    <div ref={folderRef} key={folderData.id} id={`folder-${folderData.id}`}>
      <p>{folderData.name}</p>
    </div>
  );
}
