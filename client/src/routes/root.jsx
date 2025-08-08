import { useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import Files from "./files/files";
import Home from "./home/home";

export default function Root() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const unixNow = Math.floor(Date.now() / 1000);
    if (token) {
      const user = jwtDecode(token);
      if (user && user.exp <= unixNow) {
        logout();
      }
    }
  }, []);

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return (
    <>
      {token ? (
        <>
          <a onClick={logout}>Logout</a>
          <Files token={token} />
        </>
      ) : (
        <>
          {" "}
          <Link to="login">Login</Link>
          <Home />
        </>
      )}
    </>
  );
}
