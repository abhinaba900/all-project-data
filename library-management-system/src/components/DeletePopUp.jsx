import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  useToast,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { AuthContext } from "../authContext/AuthContext";

function DeletePopUp({ id, role }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { handleRerander } = React.useContext(AuthContext);
  function handleUserDelete() {
    fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        onClose();
        handleRerander(Math.random());
        toast({
          title: "User Deleted",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => console.log(err));
  }


  function handleBooksDelete() {
    fetch(`http://localhost:5000/books/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        onClose();
        handleRerander(Math.random());
        toast({
          title: "Book Deleted",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <Button onClick={onOpen} className="action-btn-delete">
        <MdDelete />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure you want to delete this user?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>NOTE: This action cannot be undone.</ModalBody>

          <ModalFooter>
            {role === "user delete" && (
              <Button
                mr={3}
                bg={"#FF0000"}
                color={"white"}
                onClick={handleUserDelete}
              >
                Delete
              </Button>
            )}
            {role === "Books delete" && (
              <Button
                mr={3}
                bg={"#FF0000"}
                color={"white"}
                onClick={handleBooksDelete}
              >
                Delete
              </Button>
            )}

            <Button variant="ghost" bg="gray.400" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default DeletePopUp;
