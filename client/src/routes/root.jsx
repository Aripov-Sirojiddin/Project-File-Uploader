import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function Root() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  function logout() {
    localStorage.removeItem("token");
    setToken(null);
  }
  return (
    <>
      {token ? (
        <Link onClick={logout}>Logout</Link>
      ) : (
        <Link to="login">Login</Link>
      )}
      <Outlet />
    </>
  );
}
