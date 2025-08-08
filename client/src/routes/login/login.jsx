import axios from "axios";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./login.module.css";

export default function LoginPage() {
  const [error, setError] = useState("");

  async function loginUser(form) {
    const data = Object.fromEntries(form);

    await axios
      .post(`${import.meta.env.VITE_URL}/login`, data)
      .then((response) => {
        console.log(response.data.token);
        localStorage.setItem("token", response.data.token);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setError("Incorrect login information provided");
        }
      });
  }

  function openGoogleLogin() {
    const width = 500;
    const height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;

    const url = `${import.meta.env.VITE_URL}/login/google`; // Your Express server URL
    window
      .open(
        url,
        "Google Login",
        `width=${width},height=${height},top=${top},left=${left}`
      )
      .focus();

    window.addEventListener("message", (event) => {
      if (event.origin !== import.meta.env.VITE_URL) {
        return;
      }

      const { token } = event.data;
      if (token) {
        localStorage.setItem("token", token);
      }
    });
  }

  return (
    <div className={styles.vertical_container}>
      <Outlet />
      {error && (
        <div className={styles.error_box}>
          <p>{error}</p>
        </div>
      )}
      <form action={loginUser} className={styles.vertical_container}>
        <input
          type="text"
          name="email"
          placeholder="Email (example@example.com)"
        />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      <div className={styles.horizontal_container}>
        <Link to="/signup">Sign Up</Link>
        <Link onClick={openGoogleLogin}>Continue with google</Link>
      </div>
    </div>
  );
}
