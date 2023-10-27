import { createBrowserRouter } from "react-router-dom";
import SetupPage from "../../pages/setup/setup.page";

export default createBrowserRouter([
    {
      path: "/admin",
      element: <SetupPage />,
    }
  ]);