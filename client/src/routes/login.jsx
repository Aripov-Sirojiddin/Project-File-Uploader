import axios from "axios";
import { useState } from "react";

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
    <>
      <h1>{error}</h1>
      <form action={loginUser}>
        <input
          type="text"
          name="email"
          placeholder="Email (example@example.com)"
        />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
