import { Outlet, createBrowserRouter, useNavigate } from "react-router-dom";
import Login from "../components/Login";
import { DEFAULT, TODO } from "./keys";
import Todo from "../components/Todo";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

export const checkTokenExpiration = () => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    const decodedToken = token !== null ? jwtDecode(token) : null
    const exp = decodedToken?.exp
    const expDate  = exp !== null ? new Date(exp * 1000) : 0;
    const currentDate = new Date()
    return expDate > currentDate;
  }
  return false;
};

const AuthLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isExpired = !checkTokenExpiration();
    if (isExpired) {
      localStorage.clear();
      navigate(DEFAULT);
    }
  }, [navigate]);

  return <Outlet />;
};

export const router = createBrowserRouter([
  {
    path: DEFAULT,
    element: <Login />,
  },
  {
    element: <AuthLayout />,
    children:[{
      path: TODO,
      element: <Todo />
    }]

  }
])