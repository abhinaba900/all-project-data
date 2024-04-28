import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { FaEye, FaRegEdit } from "react-icons/fa";
import { AuthContext } from "../authContext/AuthContext";

function EditAndSee({ role, user, id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { allUsers, handleRerander } = React.useContext(AuthContext);
  const toast = useToast();
  const [userData, setUserData] = React.useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    libraryId: ``,
    ownedbooks: 0,
    totalborrows: 0,
  });
  const [orignalUserData, setOrignalUserData] = React.useState({});
  const [orignalBooksData, setOrignalBooksData] = React.useState({});

  const [booksData, setBooksData] = React.useState({
    name: "",
    author: "",
    genre: "",
    stock: 0,
    available: 0,
  });

  useEffect(() => {
    if (user === "books") {
      const foundBook = allUsers?.books?.find((book) => book.id === id);

      setBooksData({
        name: foundBook?.name,
        author: foundBook?.author,
        genre: foundBook?.genre,
        stock: foundBook?.stock,
        available: foundBook?.available,
      });

      setOrignalBooksData({
        name: foundBook?.name,
        author: foundBook?.author,
        genre: foundBook?.genre,
        stock: foundBook?.stock,
        available: foundBook?.available,
      });
    }
    if (user === "user") {
      const foundUser = allUsers?.users?.find((userItem) => userItem.id === id);
      if (foundUser) {
        setUserData({
          name: foundUser.name,
          email: foundUser.email,
          phone: foundUser.phone,
          address: foundUser.address,
          libraryId: foundUser.libraryId,
          ownedbooks: foundUser.ownedbooks,
          totalborrows: foundUser.totalborrows,
        });

        setOrignalUserData({
          name: foundUser.name,
          email: foundUser.email,
          phone: foundUser.phone,
          address: foundUser.address,
          libraryId: foundUser.libraryId,
          ownedbooks: foundUser.ownedbooks,
          totalborrows: foundUser.totalborrows,
        });
      }
    }
  }, [onOpen, onClose, id, user, allUsers]);

  const handleBooksSubmit = (e) => {
    e.preventDefault();
    const findBook = allUsers?.books?.find(
      (book) => book.name === booksData.name && book.author === booksData.author
    );

    if (booksData.stock < 1) {
      toast({
        title: "Stock must be greater than 0",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      handleClose();
      return;
    }
    if (findBook) {
      toast({
        title: "Book Already Exists",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      handleClose();
      return;
    } else {
      fetch(`http://localhost:5000/books/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booksData),
      }).then(() => {
        toast({
          title: "Book Updated",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        handleRerander(Math.random());
        onClose();
      });
    }
  };

  const handleBookChange = (e) => {
    setBooksData({ ...booksData, [e.target.name]: e.target.value });
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }).then(() => {
      toast({
        title: "User Updated",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      handleRerander(Math.random());
      onClose();
    });
    return;
  };

  const handleClose = () => {
    onClose();
    if (user === "user") {
      setUserData(orignalUserData);
    }
    if (user === "books") {
      setBooksData(orignalBooksData);
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleActiveBorrows = (user) => {
    const activeBorrows = allUsers?.allRecords?.filter(
      (users) => users.user_id === user
    );
    if (activeBorrows.length > 0) {
      const temp = activeBorrows.filter((users) => users.active === true);
      return temp.length;
    }
    return 0;
  };

  const handleTotalBorrows = (user) => {
    const activeBorrows = allUsers?.allRecords?.filter(
      (users) => users.user_id === user
    );
    if (activeBorrows.length > 0) {
      const temp = activeBorrows.filter((users) => users.active === false);
      return temp.length;
    }
    return 0;
  };

  return (
    <div>
      {role === "see" && (
        <Button onClick={onOpen} className="action-btn-view">
          <FaEye />
        </Button>
      )}

      {role === "edit" && (
        <Button onClick={onOpen} className="action-btn-edit">
          <FaRegEdit />
        </Button>
      )}

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {user === "user" && (role === "see" ? "View User" : "Edit User")}
            {user === "books" && role === "edit" && "Edit Book"}
          </ModalHeader>
          <ModalCloseButton />
          <hr />
          {role === "see" && user === "user" && (
            <ModalBody>
              <div>
                <p>Name: {userData.name}</p>
                <p>Email: {userData.email}</p>
                <p>Phone: {userData.phone}</p>
                <p>Address: {userData.address}</p>
                <p>Library Id: {userData.libraryId}</p>
                <p>Total Borrows: {handleTotalBorrows(id)}</p>
                <p>Active Borrows: {handleActiveBorrows(id)}</p>
              </div>
            </ModalBody>
          )}

          {role === "edit" && user === "user" && (
            <ModalBody>
              <form id="form-1" onSubmit={handleUserSubmit}>
                <FormControl isRequired>
                  <FormLabel>Name:</FormLabel>
                  <Input
                    placeholder="Name"
                    id="name"
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl isRequired isDisabled>
                  <FormLabel>Email Id:</FormLabel>
                  <Input
                    placeholder="Email"
                    type="email"
                    id="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Mobile:</FormLabel>
                  <Input
                    placeholder="Mobile"
                    id="mobile"
                    type="text"
                    name="phone"
                    value={userData.phone}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Address:</FormLabel>
                  <Input
                    placeholder="Address"
                    id="address"
                    type="text"
                    name="address"
                    value={userData.address}
                    onChange={handleChange}
                  />
                </FormControl>
                <Button
                  type="submit"
                  colorScheme="blue"
                  mr={3}
                  onClick={onClose}
                  id="add"
                >
                  Update
                </Button>
              </form>
            </ModalBody>
          )}
          {role === "edit" && user === "books" && (
            <ModalBody>
              <form id="form-1" onSubmit={handleBooksSubmit}>
                <FormControl isRequired>
                  <FormLabel>Name:</FormLabel>
                  <Input
                    placeholder="Name"
                    id="name"
                    type="text"
                    name="name"
                    value={booksData.name}
                    onChange={handleBookChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Author:</FormLabel>
                  <Input
                    placeholder="author"
                    type="text"
                    id="email"
                    name="author"
                    value={booksData.author}
                    onChange={handleBookChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Genre:</FormLabel>
                  <Input
                    placeholder="Genre"
                    id="mobile"
                    type="text"
                    name="genre"
                    value={booksData.genre}
                    onChange={handleBookChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Stock:</FormLabel>
                  <Input
                    placeholder="Stock"
                    id="address"
                    type="number"
                    name="stock"
                    value={booksData.stock}
                    onChange={handleBookChange}
                  />
                </FormControl>
                <Button
                  type="submit"
                  colorScheme="blue"
                  mr={3}
                  onClick={onClose}
                  id="add"
                >
                  Update
                </Button>
              </form>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default EditAndSee;
