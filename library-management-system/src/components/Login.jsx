import React from "react";
import "./Css/Login.scss";
import { AuthContext } from "../authContext/AuthContext";
import { useToast } from "@chakra-ui/react";
import { Navigate, useNavigate } from "react-router-dom";
function Login() {
  const { allUsers, login, setLogin } = React.useContext(AuthContext);
  const [loginData, setLoginData] = React.useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = React.useState({
    email: false,
    password: false,
  });

  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const find_user = allUsers.librarians.find(
      (user) => user.email === loginData.email
    );
    const find_user2 = allUsers.users.find(
      (user) => user.email === loginData.email
    );
    const validateEmail = (email) => {
      const emailRegex =
        !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          email
        );

      if (emailRegex) {
        return false;
      } else {
        return true;
      }
    };
    if (loginData.email === "") {
      setErrorMessage({ ...errorMessage, email: "Please Enter Email ID" });
      toast({
        title: "Please Enter Email ID",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });

      return;
    } else if (loginData.password === "") {
      setErrorMessage({ ...errorMessage, password: "Please Enter Password" });
      toast({
        title: "Please Enter Password",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (!validateEmail(loginData.email)) {
      setErrorMessage({
        ...errorMessage,
        email: "Please Enter Valid Email ID",
      });
      toast({
        title: "Please Enter Valid Email ID",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    } else if (find_user) {
      if (
        find_user.email === loginData.email ||
        find_user2.email === loginData.email
      ) {
        if (
          find_user?.password === loginData.password ||
          find_user2?.password === loginData.password
        ) {
          toast({
            title: "Login Successful",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setLogin(true);
          localStorage.setItem("login", JSON.stringify(true));
          localStorage.setItem(
            "role",
            JSON.stringify(find_user.role || "user")
          );
          setErrorMessage("");
          setLoginData({
            email: "",
            password: "",
          });
          navigate("/home");
        } else {
          setErrorMessage({
            ...errorMessage,
            password: "Password does not match",
          });
          toast({
            title: "Password does not match",
            status: "warning",
            duration: 3000,
            isClosable: true,
          });
        }
      } else {
        setErrorMessage({
          ...errorMessage,
          email: "Email ID does not exist Please Contact Admin",
        });
      }
    }
  };

  if (login) {
    return <Navigate to="/home" />;
  }

  return (
    <div className=" loginContainer">
      <h1>LIBRARY</h1>
      <form id="loginForm" onSubmit={handleSubmit}>
        <h2>Login to Your Account</h2>
        <label>
          <input
            type="text"
            placeholder="Email ID"
            name="email"
            value={loginData.email}
            onChange={(e) => {
              setLoginData({ ...loginData, [e.target.name]: e.target.value });
              setErrorMessage({ ...errorMessage, email: false });
            }}
          />
          {errorMessage.email && (
            <p className="error-message">{errorMessage.email}</p>
          )}
        </label>
        <label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={loginData.password}
            onChange={(e) => {
              setLoginData({ ...loginData, [e.target.name]: e.target.value });
              setErrorMessage({ ...errorMessage, password: false });
            }}
          />
          {errorMessage.password && (
            <p className="error-message">{errorMessage.password}</p>
          )}
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
