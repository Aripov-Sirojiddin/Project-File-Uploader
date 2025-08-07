import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import LoginPage from "./routes/login/login";
import SignUp from "./routes/signup/signup";
import CloseWindow from "./routes/login/closeWindow";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "close",
    element: <CloseWindow />,
  },
]);

export default router;
