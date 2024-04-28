import React, { useEffect } from "react";
import "./Css/Signup.css";
import { useNavigate, useParams } from "react-router-dom";
import validator from "validator";
import { useToast } from "@chakra-ui/react";
import Datas from "../db.json"; // Assuming you're importing your JSON data
import { AuthContext } from "../AuthContext/AuthContext";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Signup() {
  const navigate = useNavigate();
  const toast = useToast();
  const { id } = useParams();

  // State variables
  const {
    AllUserData,
    setAllUserData,
    ImageData,
    currentItems,
    setImageData,
    allData,
    setAllData,
    setCurrentItems,
    currentPage,
    itemsPerPage,
  } = React.useContext(AuthContext);
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const login = id || false;
  const [isEmailValid, setIsEmailValid] = React.useState({
    email: false,
    password: false,
    confirmPassword: false,
    name: false,
    phone: false,
    address: false,
    image: false,
  });
  const admin =
    allData.find(
      (data) => data.id === JSON.parse(localStorage.getItem("userId"))
    )?.isAdmin || false;

  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    setConfirmPassword(AllUserData.password);
    setImageData(AllUserData.img);
  }, [id]);
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
        setConfirmPassword(!login ? value : AllUserData.password);
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
      case "isAdmin":
        setAllUserData((prevData) => ({ ...prevData, isAdmin: value }));
        setIsEmailValid({
          email: false,
          password: false,
          confirmPassword: false,
          name: false,
          phone: false,
          address: false,
          image: false,
        });
      default:
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!login && !admin) {
        setAllUserData({
          email: "",
          password: "",
          name: "",
          phone: "",
          address: "",
          image: "",
        });
      }
      const timeout = setTimeout(async () => {
        const user = Datas.users.find(
          (data) => data.email === AllUserData.email
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

        if (!validateEmail(AllUserData.email)) {
          setIsEmailValid({ ...isEmailValid, email: "Invalid Email" });
          setLoading(false);
          toast({
            title: "Error",
            description: "Invalid Email",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          return;
        } else if (AllUserData.password !== confirmPassword) {
          setIsEmailValid({
            ...isEmailValid,
            password: "Passwords do not match",
          });
          setLoading(false);
          toast({
            title: "Error",
            description: "Passwords do not match",
            status: "error",
            duration: 5000,
            isClosable: true,
          });

          return;
        } else if (!validator.isMobilePhone(AllUserData.phone, "en-IN")) {
          setIsEmailValid({ ...isEmailValid, phone: "Invalid Phone Number" });
          setLoading(false);
          toast({
            title: "Error",
            description: "Invalid Phone Number",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          return;
        } else if (user && !login) {
          setIsEmailValid({ ...isEmailValid, email: "User already exists" });
          setLoading(false);
          toast({
            title: "Error",
            description: "User already exists",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
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
          setIsEmailValid({
            ...isEmailValid,
            password: "Password is not strong",
          });
          setLoading(false);
          toast({
            title: "Error",
            description: "Password is not strong",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          return;
        } else if (login && user && id) {
          const response = await fetch(
            `http://localhost:8080/users/${user.id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: AllUserData.email,
                name: AllUserData.name,
                phone: AllUserData.phone,
                password: AllUserData.password,
                address: AllUserData.address,
                img: ImageData,
                isAdmin: AllUserData.isAdmin,
              }),
            }
          );
          const data = await response.json();
          if (response.ok) {
            setLoading(false);
            toast({
              title: "Success",
              description: "Profile Updated",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            const userIndex = allData.findIndex((user) => user.id === id);

            const updatedData = [...allData];

            updatedData[userIndex] = data;

            setAllData(updatedData);
            const temp = allData.slice(currentPage, itemsPerPage);
            setCurrentItems(temp);
            navigate("/home");
          }
        } else {
          const newUser = {
            id: Math.random(100000 * 100)
              .toString(36)
              .substr(2, 9),
            name: AllUserData.name,
            email: AllUserData.email,
            phone: AllUserData.phone,
            password: AllUserData.password,
            address: AllUserData.address,
            isAdmin: false,
            active: false,
            img: ImageData,
          };
          const response = await fetch("http://localhost:8080/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          });

          const data = await response.json();

          if (response.ok) {
            setLoading(false);
            toast({
              title: "Success",
              description: "Registration Successful",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            setAllData([...allData, data]);

            navigate("/");
          }
        }
      }, 2000);

      return () => {
        setLoading(false);
        clearTimeout(timeout);
      };
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
        {login ? (
          <p className="title">Update Data</p>
        ) : (
          <p className="title">Register</p>
        )}
        {!login && (
          <p className="message">Signup now and get full access to our app.</p>
        )}

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
            type="text"
            className="input"
            title="Error Message"
            maxLength={10}
            pattern="[0-9]{10}"
            name="phone"
            value={AllUserData.phone}
            onInput={(e) => (e.target.value = e.target.value.replace(/\D/, ""))}
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
            className="input"
            accept="image/*"
            id="uploadInput"
            name="img"
            onChange={handleFileChange}
          />
          {ImageData && (
            <img src={ImageData} alt="photo" className="image-preview" />
          )}
          {isEmailValid.image && (
            <p className="error-message">{isEmailValid.image}</p>
          )}
        </label>

        <label>
          <input
            placeholder=""
            type="text"
            name="email"
            disabled={login}
            value={AllUserData.email}
            className="input"
            onChange={handleChange}
          />
          {!login ? <span>Email</span> : ""}
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

        {admin && (
          <label>
            <select
              name="isAdmin"
              onChange={handleChange}
              value={AllUserData.isAdmin}
            >
              <option value="false">User</option>
              <option value="true">admin</option>
            </select>
          </label>
        )}
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
          {!login ? (
            <>
              <FontAwesomeIcon
                icon={faRefresh}
                className={loading ? "fa-spin" : ""}
              />
              <span>{loading ? "Loading..." : "SignUp"}</span>
            </>
          ) : (
            <>
              <FontAwesomeIcon
                icon={faRefresh}
                className={loading ? "fa-spin" : ""}
              />
              <span>{loading ? "Loading..." : "Update"}</span>
            </>
          )}
        </button>
        {!login && (
          <p className="signin" onClick={() => navigate("/")}>
            Already have an account ? <a href="#">Signin</a>
          </p>
        )}
      </form>
    </div>
  );
}

export default Signup;
