import React, { useEffect } from "react";
import "./Css/Signup.css";
import { Navigate, useNavigate } from "react-router-dom";
import validator from "validator";
import { useToast } from "@chakra-ui/react";
import { AuthContext } from "../AuthContext/AuthContext";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Signup() {
  const navigate = useNavigate();
  const toast = useToast();
  const [Datas, setDatas] = React.useState([]);
  // State variables
  const {
    AllUserData,
    setAllUserData,
    imageData,
    setImageData,
    setUserId,
    login,
    setLogin,
  } = React.useContext(AuthContext);
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [isEmailValid, setIsEmailValid] = React.useState({
    email: false,
    password: false,
    confirmPassword: false,
    name: false,
    phone: false,
    address: false,
    image: false,
  });
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setLogin(JSON.parse(localStorage.getItem("login")));
    async function foo() {
      const response = await fetch("http://localhost:8080/users");
      const data = await response.json();
      setDatas(data);
    }
    foo();
  }, [setLogin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setAllUserData((prevData) => ({ ...prevData, name: value }));

        setIsEmailValid({
          email: false,
          password: false,
          confirmPassword: false,
          name: false,
          phone: false,
          address: false,
          image: false,
        });
        break;
      case "email":
        setAllUserData((prevData) => ({ ...prevData, email: value }));

        setIsEmailValid({
          email: false,
          password: false,
          confirmPassword: false,
          name: false,
          phone: false,
          address: false,
          image: false,
        });

        break;
      case "phone":
        setAllUserData((prevData) => ({ ...prevData, phone: value }));

        setIsEmailValid({
          email: false,
          password: false,
          confirmPassword: false,
          name: false,
          phone: false,
          address: false,
          image: false,
        });

        break;
      case "password":
        setAllUserData((prevData) => ({ ...prevData, password: value }));

        setIsEmailValid({
          email: false,
          password: false,
          confirmPassword: false,
          name: false,
          phone: false,
          address: false,
          image: false,
        });

        break;
      case "confirmPassword":
        setConfirmPassword(value);

        setIsEmailValid({
          email: false,
          password: false,
          confirmPassword: false,
          name: false,
          phone: false,
          address: false,
          image: false,
        });

        break;
      case "address":
        setAllUserData((prevData) => ({ ...prevData, address: value }));

        setIsEmailValid(false);
        break;
      default:
        break;
    }
  };

  // Function to handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (readerEvent) {
        const imageData = readerEvent.target.result;
        setImageData(imageData);
        setIsEmailValid({
          email: false,
          password: false,
          confirmPassword: false,
          name: false,
          phone: false,
          address: false,
          image: false,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  if (login) {
    return <Navigate to="/" replace={true} />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const timeout = setTimeout(async () => {
        const user = Datas.find((data) => data.email === AllUserData.email);
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
        if (AllUserData.name === "") {
          setIsEmailValid({ ...isEmailValid, name: "Name is required" });
          toast({
            title: "Error",
            description: "Name is required",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          setLoading(false);
          return;
        }

        if (AllUserData.phone === "") {
          setIsEmailValid({ ...isEmailValid, phone: "Phone is required" });
          toast({
            title: "Error",
            description: "Phone is required",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          setLoading(false);
          return;
        }

        if (imageData === "") {
          setIsEmailValid({
            ...isEmailValid,
            image: "Image is required",
          });
          toast({
            title: "Error",
            description: "Phone Number is required",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          setLoading(false);
          return;
        }

        if (AllUserData.email === "") {
          setIsEmailValid({ ...isEmailValid, email: "Email is required" });
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

        if (AllUserData.password === "") {
          setIsEmailValid({
            ...isEmailValid,
            password: "Password is required",
          });
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

        if (confirmPassword === "") {
          setIsEmailValid({
            ...isEmailValid,
            confirmPassword: "Confirm Password is required",
          });
          toast({
            title: "Error",
            description: "Confirm Password is required",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          setLoading(false);
          return;
        }

        if (AllUserData.address === "") {
          setIsEmailValid({ ...isEmailValid, address: "Address is required" });
          toast({
            title: "Error",
            description: "Address is required",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          setLoading(false);
          return;
        }

        if (!validator.isMobilePhone(AllUserData.phone, "en-IN")) {
          toast({
            title: "Error",
            description: "Invalid Phone Number",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          setIsEmailValid({ ...isEmailValid, phone: "Invalid Phone Number" });
          setLoading(false);
          return;
        }

        const isvalidEmail = AllUserData.email.trim().split(".");

        if (isvalidEmail[isvalidEmail.length - 1].length > 3) {
          setIsEmailValid({ ...isEmailValid, email: "Invalid Email" });
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
          setIsEmailValid({ ...isEmailValid, email: "Invalid Email" });
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
        if (!validateEmail(AllUserData.email)) {
          toast({
            title: "Error",
            description: "Invalid Email",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          setIsEmailValid({ ...isEmailValid, email: "Invalid Email" });
          setLoading(false);
          return;
        } else if (AllUserData.password !== confirmPassword) {
          toast({
            title: "Error",
            description: "Passwords do not match",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          setIsEmailValid({
            ...isEmailValid,
            confirmPassword: "Passwords do not match",
          });
          setLoading(false);

          return;
        } else if (
          !validator.isStrongPassword(AllUserData.password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          })
        ) {
          toast({
            title: "Error",
            description: "Password is not strong",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          setIsEmailValid({
            ...isEmailValid,
            password: "Password is not strong",
          });
          setLoading(false);
          return;
        } else if (user) {
          toast({
            title: "Error",
            description: "User already exists",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          setIsEmailValid({ ...isEmailValid, email: "User already exists" });
          setLoading(false);
          return;
        } else {
          const newUser = {
            id: Datas.length + 1 + "",
            name: AllUserData.name,
            email: AllUserData.email,
            phone: AllUserData.phone,
            password: AllUserData.password,
            address: AllUserData.address,
            todos: [],
            img: imageData,
          };
          const response = await fetch("http://localhost:8080/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          });

          if (response.ok) {
            setUserId(Datas.length + 1 + "");
            localStorage.setItem("userId", Datas.length + 1 + "");
            toast({
              title: "Success",
              description: "Registration Successful",
              status: "success",
              duration: 5000,
              isClosable: true,
            });

            navigate("/");
            setLoading(false);
          }
        }
      }, 2000);

      return () => clearTimeout(timeout);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to register user",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Register</p>
        <p className="message">Signup now and get full access to our app.</p>

        <label>
          <input
            placeholder=""
            type="text"
            className="input"
            name="name"
            value={AllUserData.name}
            onChange={handleChange}
          />
          <span>Full Name</span>
          {isEmailValid.name && (
            <p className="error-message">{isEmailValid.name}</p>
          )}
        </label>

        <label>
          Phone Number{" "}
          <input
            placeholder=""
            type="number"
            className="input"
            title="Error Message"
            maxLength={10}
            pattern="[0-9]{10}"
            name="phone"
            value={AllUserData.phone}
            onChange={handleChange}
          />
          {isEmailValid.phone && (
            <p className="error-message">{isEmailValid.phone}</p>
          )}
        </label>

        <label>
          Image{" "}
          <input
            placeholder=""
            type="file"
            value={AllUserData.img}
            className="input"
            accept="image/*"
            id="uploadInput"
            onChange={handleFileChange}
          />
          <img src={imageData} alt="photo" className="image-preview" />
          {isEmailValid.image && (
            <p className="error-message">{isEmailValid.image}</p>
          )}
        </label>

        <label>
          <input
            placeholder=""
            type="text"
            name="email"
            value={AllUserData.email}
            className="input"
            onChange={handleChange}
          />
          <span>Email</span>
          {isEmailValid.email && (
            <p className="error-message">{isEmailValid.email}</p>
          )}
        </label>

        <label>
          <input
            placeholder=""
            name="password"
            type="password"
            className="input"
            value={AllUserData.password}
            onChange={handleChange}
          />
          <span>Password</span>
        </label>
        {isEmailValid.password && (
          <p className="error-message">{isEmailValid.password}</p>
        )}

        <label>
          <input
            placeholder=""
            type="password"
            className="input"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
          />
          <span>Confirm password</span>
          {isEmailValid.confirmPassword && (
            <p className="error-message">{isEmailValid.confirmPassword}</p>
          )}
        </label>
        <label>
          <textarea
            className="resizable-input"
            placeholder="Enter your Address..."
            name="address"
            value={AllUserData.address}
            onChange={handleChange}
          ></textarea>
          {isEmailValid.address && (
            <p className="error-message">{isEmailValid.address}</p>
          )}
        </label>

        <button className="form-btn buttonload submit">
          <FontAwesomeIcon
            icon={faRefresh}
            className={loading ? "fa-spin" : ""}
          />
          <span>{loading ? "Loading..." : "SignUp"}</span>
        </button>
        <p className="signin" onClick={() => navigate("/")}>
          Already have an account ? <a href="#">Signin</a>
        </p>
      </form>
    </div>
  );
}

export default Signup;
