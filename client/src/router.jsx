import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
