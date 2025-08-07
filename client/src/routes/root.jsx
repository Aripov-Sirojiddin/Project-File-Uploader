import { Link, Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <Link to="login">Login</Link>
      <Outlet />
    </>
  );
}
