import "./App.css";
import Navbar from "./module/common/Navbar";
import Footer from "./module/common/Footer";
import { Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { AuthContext } from "./context/auth/AuthContext";
import { ToastContext } from "./context/toast/ToastComponent";


const apiUrl = import.meta.env.VITE_API_URL;

  function App() {
  const { logout, login } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);

  useEffect(() => {
    reauthenticate();
  }, []);

  const reauthenticate = () => {
    let token = localStorage.getItem("token");
    console.log("Token from localStorage:", token); // Debugging line
    if (token) {
      try {
        let decode = jwtDecode(token);
        console.log("Decoded token:", decode);

        if (decode?.exp > Math.floor(Date.now() / 1000)) {
          // authenticated
          getUserApi(token, decode);
        } else {
          // logout
          showToast({
            show: true,
            title: "Logout",
            message: "Token Expired",
            type: "error",
          });
          logout();
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        showToast({ show: true, title: "Error", message: "Invalid token", type: "error" });
        logout();
      }
    } else {
      console.log("No token found in localStorage");
    }
  };

  const getUserApi = (token, decode) => {
    axios
      .get(`${apiUrl}/api/users/${decode._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        console.log(res.data);
        showToast({ show: true, title: "Welcome Back", message: 'Login Success', type: 'success' });
        login({token, user: res.data})
      })
      .catch((err) => {
        showToast({ show: true, title: "Error", message: err.response?.data?.message });
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;