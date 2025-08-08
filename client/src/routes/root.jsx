import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import axios from "axios";

export default function Root() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const unixNow = Math.floor(Date.now() / 1000);
    if (token) {
      const user = jwtDecode(token);
      if (user && user.exp <= unixNow) {
        logout();
      } else {
        getUser(user.id);
      }
    }
  }, []);

  async function getUser(id) {
    const response = await axios.get(`${import.meta.env.VITE_URL}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUserInfo(response.data.user);
  }

  function logout() {
    localStorage.removeItem("token");
    setUserInfo(null);
    setToken(null);
  }

  return (
    <>
      {token ? (
        <Link onClick={logout}>Logout</Link>
      ) : (
        <Link to="login">Login</Link>
      )}
      {userInfo && <p>{userInfo.name}</p>}
      <Outlet />
    </>
  );
}
