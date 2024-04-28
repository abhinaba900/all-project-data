import React, { useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import Massages from "../Components/Massages";
export const AuthContext = React.createContext();

function AuthContextProvider({ children }) {
  const [AllUserData, setAllUserData] = React.useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    address: "",
    image: "",
    isAdmin: false,
  });
  const [messages, setMessages] = React.useState([]);
  const [allData, setAllData] = React.useState([]);
  const userId = localStorage.getItem("userId");
  const { onClose } = useDisclosure();
  const [items, setItems] = React.useState([]);
  const [groups, setGroups] = React.useState([]);
  const [render, setRender] = React.useState(0);
  const [allGroups, setAllGroups] = React.useState([]);
  const [currentItems, setCurrentItems] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(5);
  const [ImageData, setImageData] = React.useState(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJ0AAACUCAMAAAC+99ssAAAAPFBMVEWoqa3///+kpan7+/uoqauhoqb39/jt7e6io6X09PTo6Omys7WsrbHDxMbh4eK4ubzY2NrR0tPLzM6YmZ7OqphzAAADz0lEQVR4nO2byZKjMAyGwdhsNkuY93/XsWFSIemGsazFOfi7dFWf/pKENitVVSgUCoVCoVAoFAqFSLQnt4Zrvlvd96KMMX3A/1Uqt5ozSjm3POZuaD1DN2+L8//MrWpHKbutQ/1BN0/W5JbmtS1j+yntoJ1tXhcrt/2w2psFp4wONlt3p23Xt+Twr89ravmvtsBoc5jPPGK0hfjbxM2n7BgpzjMLlxC1XHyov9MJeldXamog4uq6cXLyzATTFuQtUvLUArTcYT2Z2FMLXFuQZyXkKXdbHq4ZRYwHSCXvrPx5LzoJ/8LE/WUkBt3BYJnV6ajaegWzbxU8073hWNUZUAH7ycgZeVjTMZcMVNQFZj5taNPVnJGnVry6jc+1CdX/k6Fn0obKxE8aroxsZgJ19YPJtSaxOXlnZlLnCMLOzxg8Xy1FPvG0PIGnNhJ19bLP6uTqCLJdwHd5HF0yySe75+MvVuebvKIuXR0HRV12dTw9FFm+4xBXKcScfWbhUUdTZ7kaPPvNPUrVI4fZA66p7Lt7Y5LAY5u3tSNQN7BNjJrAtXxrKE3QHfNku53UlfELzuWxQRczxkWFBymu49SGrrVME88Ti4q8zrBMi080KiM34YNlfVMxyY8pfEXsRHpW6QTeuJN9y7RAORGCxqRVDIEX2v2BP23AmLhWsp+kyOMtEmc0vKJNklcfwJrRiIoLhwuAIWOwPIuda5SNfpXKcWuk+0eU+Vphrz75E3P5Mdg/GaSpys5xtludFvasUhPkSmvp969C5lhL95ALMk8zy91YKptQK1ahOy2zJe1TBG4stQbkuU/mYD7W2APVCHHzIQdazk5FOcRQccB3U6EswXpx9MHHEXs9xVmAL20sHbyBXqJeymNoWYg27oGW3Ho9leV2ecF6hLFHcoryIpwJ0qlLuuG9lUf5aOFIXirOdIShhz5s+8lM41lf+IkeF9950NRczA3vHSR5hfhzfUHyZTiGoDvAnqj6ct2zBN0B+nabza8B9O02/nXnDqRvqW4BrkD5ltWvgQZjOsz6P4413XiEPd0VDeJFlC3VvZhTC5qA6TypWQX7c4U4Ei98ZUyXGnm4H8nEkxZ5MqbzpIhT7LnuyZrwRkVxGhPHAG/i8ecT8SRsplibk3fAE5BQOvkHOCMTnaDGAZ7PROrEkwGmTtax0OmxF0t2Bw9IytM0J57xgE7LpB0LO/Pl2ZzcATngxm/+oUAaFYrVP4wh/o1ZPOxqyG9DuXZid8TP3UaoKz4T3+QZeXH1GJ+PM6iL3jXm+CjqNm4001Wf4aP4PR//BcPVNgAnOIbeAAAAAElFTkSuQmCC"
  );

  const [active, setActive] = React.useState("Dashboard");
  const [clickAndActiveUser, setClickAndActiveUser] = React.useState([]);
  const [clickAndActiveGroup, setClickAndActiveGroup] = React.useState([]);

  useEffect(() => {
    fetchUserInGroups();
    fetchGroups();
    fetchMassage();
    fetchData();
  }, [
    AllUserData,
    ImageData,
    active,
    userId,
    onClose,
    setCurrentItems,
    render,
    setItems,
    setAllData,
    setAllGroups,
    setGroups,
    setRender,
    setCurrentPage,
    setItemsPerPage,
    Massages,
    setMessages,
  ]);
  async function fetchData() {
    try {
      const response = await fetch("http://localhost:8080/users");
      const data = await response.json();
      setAllData(data);
      setCurrentItems(data.slice(0, 5));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }
  async function fetchGroups() {
    try {
      const response = await fetch("http://localhost:8080/groups");
      const data = await response.json();
      setGroups(data);
      setAllGroups(data);
    } catch (error) {
      console.log("Error fetching groups:", error);
    }
  }

  async function fetchUserInGroups() {
    try {
      const response = await fetch("http://localhost:8080/memberofgroup");
      const data = await response.json();
      setItems(data);
      console.log(data, "this is data at authcontext with all groups");
    } catch (error) {
      console.log("Error fetching user in groups:", error);
    }
  }

  async function fetchMassage() {
    try {
      const response = await fetch("http://localhost:8080/masseges");
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.log("Error fetching messages:", error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        AllUserData,
        setAllUserData,
        ImageData,
        setImageData,
        allData,
        setAllData,
        active,
        setActive,
        currentItems,
        setCurrentItems,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        setItemsPerPage,
        groups,
        setGroups,
        items,
        setItems,
        render,
        setRender,
        allGroups,
        setAllGroups,
        clickAndActiveUser,
        setClickAndActiveUser,
        clickAndActiveGroup,
        setClickAndActiveGroup,
        messages,
        setMessages,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
