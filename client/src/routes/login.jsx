import axios from "axios";

export default function LoginPage() {
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
        console.error(error);
      });
    console.log(result);
  }

  return (
    <form action={loginUser}>
      <input
        type="text"
        name="email"
        placeholder="Email (example@example.com)"
      />
      <input type="password" name="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}
