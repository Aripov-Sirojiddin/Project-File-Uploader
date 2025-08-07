import axios from "axios";
import styles from "../login/login.module.css";

export default function SignUp() {
  async function createAccount(event) {
    const data = Object.fromEntries(event);
    await axios
      .post(`${import.meta.env.VITE_URL}/signup`, data)
      .then((response) => {
        console.log(response);
      })
      .catch((errors) => {
        console.log(errors);
      });
  }

  return (
    <div className={styles.vertical_container}>
      <h1>Create Account</h1>
      <form action={createAccount}>
        <input name="firstname" placeholder="Firstname" type="text" />
        <input name="lastname" placeholder="Lastname" type="text" />
        <input
          name="email"
          placeholder="Email (example@example.com)"
          type="text"
        />
        <input name="password" placeholder="Password" type="password" />
        <input
          id="confirm_password"
          name="confirm_password"
          placeholder="Confirm Password"
          type="password"
        />
        <button type="submit">Create account</button>
      </form>
    </div>
  );
}
