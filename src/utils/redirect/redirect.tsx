import { NavigateOptions, useLocation, useNavigate } from "react-router-dom";

export default () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (to: string, options?: NavigateOptions) => {
    if (!to.startsWith("/admin")) to = "/admin" + to;
    if (location.pathname !== to) navigate(to, options);
  };
};
