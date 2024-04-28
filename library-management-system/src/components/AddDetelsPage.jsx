import React from "react";
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
import { AuthContext } from "../authContext/AuthContext";

function AddDetelsPage({ user }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { allUsers, handleRerander } = React.useContext(AuthContext);
  const toast = useToast();
  const [userData, setUserData] = React.useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    libraryId: `ID-${Math.floor(Math.random() * 100) + 1}`,
    ownedbooks: 0,
    totalborrows: 0,
  });

  const [allBooksData, setAllBooksData] = React.useState({
    name: "",
    author: "",
    genre: "",
    stock: 0,
    available: 0,
  });

  const [openRecords, setOpenRecords] = React.useState({
    user_id: "",
    book_id: "",
    active: true,
    issueDate: new Date().toISOString().substr(0, 10),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .substr(0, 10),
    fine: 0,
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleBookChange = (e) => {
    setAllBooksData({ ...allBooksData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      );

    return emailRegex;
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    try {
      const findUser = allUsers?.users?.find(
        (user) => user.email === userData.email.trim()
      );
      console.log(findUser);

      if (findUser) {
        toast({
          title: "User Already Exists",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      if (!validateEmail(userData.email)) {
        toast({
          title: "Invalid Email",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      } else {
        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        })
          .then(() => {
            toast({
              title: "User Added",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            handleRerander(Math.random());
            onClose();
          })
          .catch((err) => console.log(err));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookSubmit = (e) => {
    e.preventDefault();

    const findBook = allUsers?.books?.find(
      (book) =>
        book.name === allBooksData.name && book.author === allBooksData.author
    );

    if (findBook) {
      toast({
        title: "Book Already Exists",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (allBooksData.stock < 1) {
      toast({
        title: "Stock must be greater than 0",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const mainUser = {
      name: allBooksData.name,
      author: allBooksData.author,
      genre: allBooksData.genre,
      stock: allBooksData.stock,
      available: allBooksData.stock,
    };
    fetch("http://localhost:5000/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mainUser),
    })
      .then(() => {
        toast({
          title: "Book Added",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        handleRerander(Math.random());

        setAllBooksData({
          name: "",
          author: "",
          genre: "",
          stock: 0,
          available: 0,
        });
        onClose();
      })
      .catch((err) => console.log(err));
  };
  const checkAvailable = (stock, id) => {
    const filterStock = allUsers?.allRecords?.filter(
      (user) => user.book_id === id
    );
    if (filterStock.length > 0) {
      const temp = filterStock.filter((user) => user.active === true);
      if (temp.length > 0) {
        return stock - temp.length;
      }
    }

    return stock;
  };

  const handleOpenRecordSubmit = async (e) => {
    e.preventDefault();
    try {
      const findBook = allUsers?.books?.find(
        (book) => book.name === openRecords.book
      );

      const findUser = allUsers?.users?.find(
        (user) => user.name === openRecords.name
      );
      const findActiveNameAndBook = allUsers?.allRecords?.find(
        (record) =>
        record.active === true &&
        allUsers?.books?.find((book) => book.id === record.book_id).name === openRecords.book &&
        allUsers?.users?.find((user) => user.id === record.user_id).name === openRecords.name
      )

      if (findActiveNameAndBook) {
        toast({
          title: "Book Already Issued By This User",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      const updatedStock = checkAvailable(findBook?.stock, findBook?.id);

      if (updatedStock < 1) {
        toast({
          title: "Book Not Available",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      if (!findBook) {
        toast({
          title: "Book Not Found",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      if (!findUser) {
        toast({
          title: "User Not Found",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const mainUser = {
        user_id: findUser.id,
        book_id: findBook.id,
        active: true,
        issueDate: openRecords.issueDate,
        dueDate: openRecords.dueDate,
        fine: 0,
      };

      fetch("http://localhost:5000/allRecords", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mainUser),
      })
        .then(() => {
          toast({
            title: "Record Added",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          handleRerander(Math.random());
          onClose();
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to add record",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleOpenRecordChange = (e) => {
    const { name, value } = e.target;
    setOpenRecords((prevState) => ({
      ...prevState,
      [name]: value,
      author:
        name === "book"
          ? allUsers?.books?.find((book) => book.name === value)?.author
          : prevState.author,
    }));
  };
  return (
    <div>
      <Button onClick={onOpen}>
        {user === "users" && "Add User"}
        {user === "books" && "Add Book"}
        {user === "Open Records" && "Add a Record"}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {user === "users" && "Please Add Details"}
            {user === "books" && "Add Book Details"}
            {user === "Open Records" && "Add Details"}
          </ModalHeader>
          <ModalCloseButton />
          <hr />
          {user === "users" && (
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
                <FormControl isRequired>
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
                <Button type="submit" colorScheme="blue" mr={3} id="add">
                  Add
                </Button>
              </form>
            </ModalBody>
          )}

          {user === "books" && (
            <ModalBody>
              <form id="form-1" onSubmit={handleBookSubmit}>
                <FormControl isRequired>
                  <FormLabel>Book Name:</FormLabel>
                  <Input
                    placeholder="Name"
                    id="name"
                    type="text"
                    name="name"
                    value={allBooksData.name}
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
                    value={allBooksData.author}
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
                    value={allBooksData.genre}
                    onChange={handleBookChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Total Stock:</FormLabel>
                  <Input
                    placeholder="Total Stock"
                    id="address"
                    type="number"
                    name="stock"
                    value={allBooksData.stock}
                    onChange={handleBookChange}
                  />
                </FormControl>
                <Button type="submit" colorScheme="blue" mr={3} id="add">
                  Add
                </Button>
              </form>
            </ModalBody>
          )}

          {user === "Open Records" && (
            <ModalBody>
              <form onSubmit={handleOpenRecordSubmit}>
                <FormControl isRequired>
                  <FormLabel>Member Name:</FormLabel>
                  <select
                    name="name"
                    value={openRecords.name}
                    onChange={handleOpenRecordChange}
                  >
                    <option value="-">Select</option>
                    {allUsers.users.map((user) => (
                      <option key={Math.random()} value={user.name}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Book Name:</FormLabel>
                  <select
                    name="book"
                    value={openRecords.book}
                    onChange={handleOpenRecordChange}
                  >
                    <option value="-">Select</option>
                    {allUsers.books.map((book) => (
                      <option key={Math.random()} value={book.name}>
                        {book.name}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormControl isRequired isDisabled>
                  <FormLabel>Issue Date:</FormLabel>
                  <Input
                    type="date"
                    name="issueDate"
                    value={openRecords.issueDate}
                    onChange={handleOpenRecordChange}
                  />
                </FormControl>
                <FormControl isRequired isDisabled>
                  <FormLabel>Due Date:</FormLabel>
                  <Input
                    type="date"
                    name="dueDate"
                    value={openRecords.dueDate}
                    onChange={handleOpenRecordChange}
                  />
                </FormControl>
                <Button type="submit" colorScheme="blue" mr={3}>
                  Issue Book
                </Button>
              </form>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default AddDetelsPage;
