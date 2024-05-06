import React from "react";
import { useNavigate } from "react-router-dom";
import Toast from "./Toast";

function Login() {
  const [errors, setErrors] = React.useState({
    email: "",
    password: "",
  });

  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
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

      if (!values.email) {
        setErrors({ ...errors, email: "Email is required" });
        return;
      }

      if (!values.password) {
        setErrors({ ...errors, password: "Password is required" });
        return;
      }

      if (values.password.length < 6) {
        setErrors({
          ...errors,
          password: "Password must be at least 6 characters",
        });
        return;
      }

      const isvalidEmail = values.email.trim().split(".");

      if (isvalidEmail[isvalidEmail.length - 1].length > 3) {
        setErrors({
          ...errors,
          email: "Please enter a valid email",
        });
        return;
      }

      if (!validateEmail(values?.email)) {
        setErrors({
          ...errors,
          email: "Please enter a valid email",
        });
        return;
      }

      const { email, password } = JSON.parse(localStorage.getItem("data"));

      if (!email) {
        setErrors({
          ...errors,
          email: "email does not exist",
        });

        return;
      }

      if (!password) {
        setErrors({
          ...errors,
          password: "Please enter a valid password",
        });
        return;
      }

      if (email.trim() !== values.email) {
        setErrors({
          ...errors,
          email: "email does not exist",
        });
        return;
      }

      if (password !== values.password) {
        setErrors({
          ...errors,
          password: "Please enter a valid password",
        });
        return;
      }

      setTimeout(() => {
        navigate("/");
        return <Toast />;
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form className="form-section container" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            name="email"
            placeholder="Username or Email Address"
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </label>
        <div className="remember-me">
          <input type="checkbox" name="remember me" id="" />
          Remember Me
        </div>
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default Login;
