import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export default function Files({ token }) {
  const [user, setUser] = useState();

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
  return (
    <>
      <h1>Files</h1>
      {user && <p>Welcome back {user.name}!</p>}
    </>
  );
}
