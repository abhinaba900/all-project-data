import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

function AddTodo({
  user,
  mainObj,
  setMainObj,
  setFilter,
  characters,
  setCharacters,
  setFilterdData,
}) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [taskName, setTaskName] = React.useState("");
  const [todoExists, setTodoExists] = React.useState(false);
  const [provideValue, setProvideValue] = useState({
    name: false,
    description: false,
  });
  const handleClick = async () => {
    try {
      let todos = characters.find((item) => item.title === taskName);

      console.log(todos);
      if (todos) {
        setTodoExists(true);
        return;
      } else if (taskName === "" || taskName === undefined) {
        setProvideValue({ ...provideValue, name: true });
        return;
      } else if (description === "" || description === undefined) {
        setProvideValue({ ...provideValue, description: true });
        return;
      } else {
        const userData = {
          id: Math.floor(Math.random() * 1000000) + 100 + "",
          title: taskName,
          AddedDate: Date.now(),
          description: description,
          status: false,
          userId: user,
        };

        const MainData = { ...mainObj, todos: [...characters, userData] };
        setMainObj(MainData);
        console.log(user);
        const response = await fetch(`http://localhost:8080/users/${user}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(MainData),
        });

        if (!response.ok) {
          throw new Error("Failed to add todo.");
        }
        setFilter("all");
        setTaskName("");
        setDescription("");
        setTodoExists(false);
        const newData = await response.json();
        console.log(newData);
        setCharacters([...characters, newData]);
        setFilterdData([...characters, newData]);

        toast({
          title: "1 Todo added successfully.",
          description: "We've added your todo for you.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose();
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <div>
      <Button onClick={onOpen}>Add Todo</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                ref={initialRef}
                placeholder="Title"
                defaultValue={taskName}
                value={taskName}
                onChange={(e) => {
                  setTaskName(e.target.value);
                  setTodoExists(false);
                }}
              />
              {todoExists ? (
                <p className="error-message">Task already exists</p>
              ) : null}
              {provideValue.name ? (
                <p className="error-message">Enter Task Name</p>
              ) : null}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <FormLabel>
                <textarea
                  className="resizable-input"
                  placeholder="Enter your description..."
                  name="address"
                  value={description}
                  required
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setDescriptionError(false);
                  }}
                ></textarea>
                {descriptionError && (
                  <p style={{ color: "red" }}>Please enter Input</p>
                )}
              </FormLabel>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleClick}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default AddTodo;
