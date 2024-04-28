import React, { useEffect } from "react";
export const AuthContext = React.createContext();
function AuthContextProvider({ children }) {
  const [AllUserData, setAllUserData] = React.useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    address: "",
    image: "",
  });

  const [imageData, setImageData] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [login, setLogin] = React.useState(
    JSON.parse(localStorage.getItem("login")) || false
  );
  useEffect(() => {
    setLogin(JSON.parse(localStorage.getItem("login")));
  }, [setAllUserData, setUserId, setLogin, setLogin]);

  return (
    <AuthContext.Provider
      value={{
        AllUserData,
        setAllUserData,
        imageData,
        setImageData,
        userId,
        setUserId,
        login,
        setLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
