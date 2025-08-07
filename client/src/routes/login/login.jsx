import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./login.module.css";

export default function LoginPage() {
  const [error, setError] = useState("");

  async function loginUser(form) {
    const result = await axios
      .post("http://localhost:3000/login", {
        email: form.email,
        password: form.password,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setError("Incorrect login information provided");
        }
      });
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
        <Link to="/signup">Continue with google</Link>
      </div>
    </div>
  );
}
