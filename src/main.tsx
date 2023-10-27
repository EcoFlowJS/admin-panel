import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import router from "./App";
// import "rsuite/dist/rsuite.min.css";
import "./index.css";
import { CustomProvider } from 'rsuite';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CustomProvider theme="dark">
    <RouterProvider router={router} />
    </CustomProvider>
  </React.StrictMode>
);
