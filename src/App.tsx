import { createBrowserRouter } from "react-router-dom";
import Button from "rsuite/Button";
import { Container, CustomProvider } from "rsuite";
export default createBrowserRouter([
  {
    path: "/admin",
    element: (
      <CustomProvider theme="dark">
        <Container>
          <Button appearance="primary">Default</Button>
        </Container>
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
