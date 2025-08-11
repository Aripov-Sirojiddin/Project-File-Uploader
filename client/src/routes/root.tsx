import { Link } from "react-router-dom";
import Files from "./files/files.tsx";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch } from "../state/store.ts";
import { type RootState } from "../state/store.ts";
import { signout } from "../state/user/userSlice.ts";
import Home from "./home/home.tsx";
import { removeStoredFiles } from "../state/path/pathSlice.ts";

const Root: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.value);
  const dispatch = useDispatch<AppDispatch>();

  function logout() {
    dispatch(removeStoredFiles());
    dispatch(signout());
  }

  return (
    <>
      {user ? (
        <>
          <a onClick={logout}>Logout</a>
          <Files />
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
};

export default Root;
