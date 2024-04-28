import React from "react";
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

function DeletePopUp({
  id,
  todoId,
  mainObj,
  setMainObj,
  setCharacters,
  characters,
  setFilterdData,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  function handleDelete() {
    const newData = characters.filter((item) => item.id !== todoId);
    console.log(newData);
    setCharacters(newData);
    setFilterdData(newData);

    const mainData = { ...mainObj, todos: newData };

    setMainObj(mainData);

    fetch(`http://localhost:8080/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mainData),
    });
    toast({
      title: "1 User Deleted",
      description: "User Deleted Successfully",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    onClose();
  }
  return (
    <div>
      <div
        as={"div"}
        onClick={onOpen}
        bg={"#FF0000"}
        color={"white"}
        _hover={{ bg: "#FF0000" }}
      >
        <MdDelete className="delete" />
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure you want to delete this user?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>NOTE: This action cannot be undone.</ModalBody>

          <ModalFooter>
            <Button
              mr={3}
              bg={"#FF0000"}
              color={"white"}
              onClick={handleDelete}
            >
              Delete
            </Button>

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
