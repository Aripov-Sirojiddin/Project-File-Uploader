import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

export default function Root() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const user = jwtDecode(token);

  useEffect(() => {
    const unixNow = Math.floor(Date.now() / 1000);
    if (user && user.exp <= unixNow) {
      logout();
    }
  }, []);

  function getUser() {
    console.log(user);
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return (
    <>
      {getUser()}
      {token ? (
        <Link onClick={logout}>Logout</Link>
      ) : (
        <Link to="login">Login</Link>
      )}
      <Outlet />
    </>
  );
}
