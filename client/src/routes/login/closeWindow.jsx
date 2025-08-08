import { useEffect } from "react";

//Close any pop-up windows for example the Google Auth
export default function CloseWindow() {
  useEffect(() => {
    window.close();
    history.back();
  }, []);
}
