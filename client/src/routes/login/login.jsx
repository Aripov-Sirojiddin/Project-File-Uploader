import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./login.module.css";

export default function LoginPage() {
  const [error, setError] = useState("");

  async function loginUser(form) {
    const data = Object.fromEntries(form);

    await axios
      .post(`${import.meta.env.VITE_URL}/login`, data)
      .then((response) => {
        console.log(response);
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

    const url = `${import.meta.env.VITE_URL}/login/federated/google`; // Your Express server URL
    window.open(
      url,
      "Google Login",
      `width=${width},height=${height},top=${top},left=${left}`
    );
  }

  return (
    <div className={styles.vertical_container}>
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
