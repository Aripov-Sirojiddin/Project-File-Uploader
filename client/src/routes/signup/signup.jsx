import axios from "axios";
import styles from "../login/login.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignUp() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [userInput, setUserInput] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  async function createAccount(event) {
    const data = Object.fromEntries(event);

    await axios
      .post(`${import.meta.env.VITE_URL}/signup`, data)
      .then((response) => {
        if (response.data.errors.length === 0) {
          navigate("/login", { state: "Created successfully!" });
        }
      })
      .catch((error) => {
        setErrors(error.response.data.errors);
      });
  }

  function updateUserInputs(event) {
    const { name, value } = event.target;
    setUserInput((oldInputs) => {
      return {
        ...oldInputs,
        [name]: value,
      };
    });
  }

  const errorsView = errors.map((error) => (
    <a href={`#${error.path}`}>{error.msg}</a>
  ));

  return (
    <div className={styles.vertical_container}>
      <h1>Create Account</h1>
      {errors.length > 0 && (
        <div className={styles.error_box}>{errorsView}</div>
      )}
      <form action={createAccount}>
        <input
          id="firstname"
          name="firstname"
          placeholder="Firstname"
          type="text"
          value={userInput.firstname}
          onChange={updateUserInputs}
        />
        <input
          id="lastname"
          name="lastname"
          placeholder="Lastname"
          type="text"
          value={userInput.lastname}
          onChange={updateUserInputs}
        />
        <input
          id="email"
          name="email"
          placeholder="Email (example@example.com)"
          type="text"
          value={userInput.email}
          onChange={updateUserInputs}
        />
        <input
          id="password"
          name="password"
          placeholder="Password"
          type="password"
        />
        <input
          name="confirm_password"
          placeholder="Confirm Password"
          type="password"
        />
        <button type="submit">Create account</button>
      </form>
    </div>
  );
}
