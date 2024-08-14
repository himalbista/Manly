import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./module/home/Homepage.jsx";
import Signup from "./module/auth/Signup/index.jsx";
import Login from "./module/auth/Login/index.jsx";
import AuthProvider from "./context/auth/AuthProvider.jsx";
import Toaster from "./module/common/Toaster/index.jsx";
import ToastProvider from "./context/toast/ToastProvider.jsx";
import BlockAuthRoute from "./routes/BlockAuthRoute.jsx";
import Dashboard from "./module/admin/Dashboard/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "signup",
        // element: <Signup />,
        element: <BlockAuthRoute><Signup /></BlockAuthRoute>,
      },
      {
        path: "login",
        // element:<Login />
        element: <BlockAuthRoute><Login /></BlockAuthRoute>,
      },
      {
       path: 'admin',
       element: <Dashboard />
      }
    ],
  },
]);
/*
  global -> isAuth.user
  AuthProvider ->isAuth,user,login,logout
   Router
     App
       Navbar -> Reflect
       Footer
       Outlet
          Homepage
          Signup
          Login- login state change
*/

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastProvider>
      <AuthProvider>
        <Toaster />
        <RouterProvider router={router} />
      </AuthProvider>
    </ToastProvider>
  </React.StrictMode>
);
