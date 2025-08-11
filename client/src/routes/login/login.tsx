import axios from "axios";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../../state/store";
import { signin } from "../../state/user/userSlice";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  async function loginUser(form: FormData) {
    const data = Object.fromEntries(form); 

    await axios
      .post(`${import.meta.env.VITE_URL}/login`, data)
      .then((response) => {
        dispatch(signin(response.data.token));
        navigate("/");
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
      ?.focus();

    window.addEventListener("message", (event) => {
      if (event.origin !== import.meta.env.VITE_URL) {
        return;
      }

      const { token } = event.data;
      if (token) {
        dispatch(signin(token));
        navigate("/");
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
      <h1>Login</h1>
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
        <a onClick={openGoogleLogin}>Continue with google</a>
      </div>
    </div>
  );
};

export default LoginPage;
