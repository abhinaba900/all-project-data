import React from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function SignUpForm() {
  const navigate = useNavigate();
  const [state, setState] = React.useState({

    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = React.useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  });
  const [status, setStatus] = React.useState(false);


  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = state;

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

    if (!firstName) {
      setErrors({ ...errors, firstName: "First Name is required" });
      return;
    }

    if (!lastName) {
      setErrors({ ...errors, lastName: "Last Name is required" });
      return;
    }

    if (!email) {
      setErrors({ ...errors, email: "Email is required" });
      return;
    }

    if (!password) {
      setErrors({ ...errors, password: "Password is required" });
      return;
    }

    if (password.length < 6) {
      setErrors({
        ...errors,
        password: "Password must be at least 6 characters",
      });
      return;
    }
    const isvalidEmail = email.trim().split(".");

    if (isvalidEmail[isvalidEmail.length - 1].length > 3) {
      setErrors({
        ...errors,
        email: "Please enter a valid email",
      });
      return;
    }



    if (!validateEmail(email)) {
      setErrors({
        ...errors,
        email: "Please enter a valid email",
      });
      return;
    }
    

    const data = {
      firstName,
      lastName,
      email,
      password,
    };


    navigate("/payment/" + JSON.stringify(email));

  };
  return (
    <div >
     
      <form onSubmit={handleSubmit}>
        <div className="sub-form">
          <p class="create-account">
            <h5> or create a new account </h5>
          </p>
        </div>

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
        />
        {errors.firstName && <p className="text-error">{errors.firstName}</p>}
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
        />
        {errors.lastName && <p className="text-error">{errors.lastName}</p>}
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        {errors.email && <p className="text-error">{errors.email}</p>}
        <label>
          <input
            type={status ? "text" : "password"}
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          {status ? (
            <FaEyeSlash
              className="eye-icon"
              onClick={() => setStatus(!status)}
            />
          ) : (
            <FaEye className="eye-icon" onClick={() => setStatus(!status)} />
          )}
        </label>
        {errors.password && <p className="text-error">{errors.password}</p>}
        <button type="submit">Continue</button>
      </form>
    </div>
  );
}

export default SignUpForm;
