import React from "react";

function SignUp({ setActiveClass }) {
  const [errors, setErrors] = React.useState({
    name: "",
    email: "",
    number: "",
    password: "",
  });

  const [values, setValues] = React.useState({
    name: "",
    email: "",
    number: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: "" });
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
      if (!values.name) {
        setErrors({ ...errors, name: "Name is required" });
        return;
      }

      if (!values.email) {
        setErrors({ ...errors, email: "Email is required" });
        return;
      }
      if (!values.number) {
        setErrors({ ...errors, number: "Number is required" });
        return;
      }

      if (!values.password) {
        setErrors({ ...errors, password: "Password is required" });
        return;
      }

      if (values.number.length < 10) {
        setErrors({
          ...errors,
          number: "Number must be at least 10 characters",
        });
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

      const data = {
        name: values.name,
        email: values.email,
        number: values.number,
        password: values.password,
      };

      localStorage.setItem("data", JSON.stringify(data));

      setActiveClass(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form className="form-section container" onSubmit={handleSubmit}>
        <label>
          Name
          <input type="text" name="name" onChange={handleChange} />
          {errors.name && <p className="error">{errors.name}</p>}
        </label>
        <label>
          Email Address
          <input type="text" name="email" onChange={handleChange} />
          {errors.email && <p className="error">{errors.email}</p>}
        </label>
        <label>
          Phone
          <input type="number" name="number" onChange={handleChange} />
          {errors.number && <p className="error">{errors.number}</p>}
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

export default SignUp;
