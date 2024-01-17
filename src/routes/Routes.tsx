import { Error404 } from "@eco-flow/components-lib";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

const Redirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/admin");
  }, []);
  return null;
};

export default function () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Redirect />} />
        <Route path="/admin" element="{<Redirect />}"></Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}
