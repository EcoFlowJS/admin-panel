import { createBrowserRouter } from "react-router-dom";
import Button from "rsuite/Button";
import { CustomProvider } from "rsuite";
export default createBrowserRouter([
  {
    path: "/admin",
    element: (
      <CustomProvider theme="dark">
        <Button appearance="primary">Default</Button>
      </CustomProvider>
    ),
  },
  {
    path: "/admin/home",
    element: <div>Hello </div>,
  },
  {
    path: "/404",
    element: <div>404</div>,
  },
]);
