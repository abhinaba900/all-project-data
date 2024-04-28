import React, { useEffect } from "react";
import "./Css/Login.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { AuthContext } from "../AuthContext/AuthContext";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Login() {
  const navigate = useNavigate();
  const toast = useToast();

  //variables
  const { setUserId, login, setLogin } = React.useContext(AuthContext);

  const [isEmailValid, setIsEmailValid] = React.useState(false);
  const [isPasswordValid, setIsPasswordValid] = React.useState(false);
  const [LoginData, setLoginData] = React.useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setLogin(JSON.parse(localStorage.getItem("login")));
  }, [setLogin]);
  const handleChange = (e) => {
    if (e.target.name === "email") {
      setLoginData({ ...LoginData, email: e.target.value });
      setIsEmailValid(false);
      setIsPasswordValid(false);
    } else if (e.target.name === "password") {
      setLoginData({ ...LoginData, password: e.target.value });
      setIsPasswordValid(false);
      setIsEmailValid(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const timeout = setTimeout(async () => {
        try {
          const response = await fetch(`http://localhost:8080/users`);
          const data = await response.json();
          const Datas = data;
          const user = Datas.find((data) => data.email === LoginData.email);

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

          if (LoginData.email === "") {
            setIsEmailValid("Email is required");
            toast({
              title: "Error",
              description: "Email is required",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
            setLoading(false);
            return;
          }

          if (LoginData.password === "") {
            setIsPasswordValid("Password is required");
            toast({
              title: "Error",
              description: "Password is required",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
            setLoading(false);
            return;
          }

          const isvalidEmail = LoginData.email.trim().split(".");
          console.log(isvalidEmail[isvalidEmail.length - 1] === "com");

          if (isvalidEmail[isvalidEmail.length - 1].length > 3) {
            setIsEmailValid("Invalid Email");
            toast({
              title: "Error",
              description: "Invalid Email",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
            setLoading(false);
            return;
          }
          if (
            isvalidEmail[isvalidEmail.length - 1] !== "com" &&
            isvalidEmail[isvalidEmail.length - 1] !== "in" &&
            isvalidEmail[isvalidEmail.length - 1] !== "org" &&
            isvalidEmail[isvalidEmail.length - 1] !== "gov" &&
            isvalidEmail[isvalidEmail.length - 1] !== "edu" &&
            isvalidEmail[isvalidEmail.length - 1] !== "mil" &&
            isvalidEmail[isvalidEmail.length - 1] !== "co" &&
            isvalidEmail[isvalidEmail.length - 1] !== "net" &&
            isvalidEmail[isvalidEmail.length - 1] !== "int" &&
            isvalidEmail[isvalidEmail.length - 1] !== "ac" &&
            isvalidEmail[isvalidEmail.length - 1] !== "io" &&
            isvalidEmail[isvalidEmail.length - 1] !== "me" &&
            isvalidEmail[isvalidEmail.length - 1] !== "us" &&
            isvalidEmail[isvalidEmail.length - 1] !== "biz" &&
            isvalidEmail[isvalidEmail.length - 1] !== "info" &&
            isvalidEmail[isvalidEmail.length - 1] !== "pro" &&
            isvalidEmail[isvalidEmail.length - 1] !== "mobi" &&
            isvalidEmail[isvalidEmail.length - 1] !== "aero" &&
            isvalidEmail[isvalidEmail.length - 1] !== "name" &&
            isvalidEmail[isvalidEmail.length - 1] !== "asia" &&
            isvalidEmail[isvalidEmail.length - 1] !== "sh" &&
            isvalidEmail[isvalidEmail.length - 1] !== "tv" &&
            isvalidEmail[isvalidEmail.length - 1] !== "cc"
          ) {
            setIsEmailValid("Invalid Email");
            toast({
              title: "Error",
              description: "Invalid Email",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
            setLoading(false);
            return;
          }
          if (!validateEmail(LoginData.email)) {
            toast({
              title: "Error",
              description: "Invalid Email",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
            setIsEmailValid("Invalid Email");
            setLoading(false);
            return;
          } else if (!user) {
            toast({
              title: "Error",
              description: "Invalid Username",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
            setIsEmailValid("Invalid Username");
            setLoading(false);
            return;
          } else if (user.password !== LoginData.password) {
            toast({
              title: "Error",
              description: "Invalid Password",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
            setIsPasswordValid("Invalid Password");
            setLoading(false);
            return;
          } else {
            setLoading(false);
            toast({
              title: "Success",
              description: "Login Success",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            setUserId(user.id);
            navigate("/home");
            setLoginData({ email: "", password: "" });
            localStorage.setItem("userId", JSON.stringify(user.id));
            localStorage.setItem("login", JSON.stringify(true));
          }
        } catch (error) {
          console.log(error);
        }
      }, 2000);

      return () => {
        clearTimeout(timeout);
      };
    } catch (error) {
      console.log(error);
    }
  };

  if (login) {
    return <Navigate to="/home" />;
  }
  return (
    <div className="form-container">
      <p className="title">Welcome back</p>
      <form className="form2" onSubmit={handleSubmit}>
        <label htmlFor="email">User Name</label>
        <input
          type="text"
          className="input"
          name="email"
          placeholder="Enter your Email"
          value={LoginData.email}
          onChange={handleChange}
        />
        {isEmailValid && (
          <p style={{ marginLeft: "10px" }} className="error-message">
            {isEmailValid}
          </p>
        )}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          name="password"
          value={LoginData.password}
          onChange={handleChange}
        />
        {isPasswordValid && (
          <p style={{ marginLeft: "10px" }} className="error-message">
            {isPasswordValid}
          </p>
        )}
        <p className="page-link">
          <span className="page-link-label">Forgot Password?</span>
        </p>
        <button className="form-btn buttonload">
          <FontAwesomeIcon
            icon={faRefresh}
            className={loading ? "fa-spin" : ""}
          />
          <span>{loading ? "Loading..." : "Login"}</span>
        </button>
      </form>
      <p className="sign-up-label" onClick={() => navigate("/signup")}>
        Don't have an account?<span className="sign-up-link">Sign up</span>
      </p>
      <div className="buttons-container">
        <div className="apple-login-button">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            className="apple-icon"
            viewBox="0 0 1024 1024"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M747.4 535.7c-.4-68.2 30.5-119.6 92.9-157.5-34.9-50-87.7-77.5-157.3-82.8-65.9-5.2-138 38.4-164.4 38.4-27.9 0-91.7-36.6-141.9-36.6C273.1 298.8 163 379.8 163 544.6c0 48.7 8.9 99 26.7 150.8 23.8 68.2 109.6 235.3 199.1 232.6 46.8-1.1 79.9-33.2 140.8-33.2 59.1 0 89.7 33.2 141.9 33.2 90.3-1.3 167.9-153.2 190.5-221.6-121.1-57.1-114.6-167.2-114.6-170.7zm-105.1-305c50.7-60.2 46.1-115 44.6-134.7-44.8 2.6-96.6 30.5-126.1 64.8-32.5 36.8-51.6 82.3-47.5 133.6 48.4 3.7 92.6-21.2 129-63.7z"></path>
          </svg>
          <span>Log in with Apple</span>
        </div>
        <div className="google-login-button">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            version="1.1"
            x="0px"
            y="0px"
            className="google-icon"
            viewBox="0 0 48 48"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
              c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
              c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
              C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
              c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
              c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>
          <span>Log in with Google</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
