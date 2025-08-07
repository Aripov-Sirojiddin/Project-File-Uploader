import { useEffect } from "react";

export default function CloseWindow() {
  useEffect(() => {
    window.close();
  }, []);
}
