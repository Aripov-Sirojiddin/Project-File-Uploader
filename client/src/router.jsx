import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import LoginPage from "./routes/login";

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
]);

export default router;
