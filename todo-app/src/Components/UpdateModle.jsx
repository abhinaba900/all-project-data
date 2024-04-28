import React, { useContext, useEffect, useState } from "react";
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
import { CiEdit } from "react-icons/ci";

function UpdateModle({
  id,
  mainObj,
  setMainObj,
  setCharacters,
  todoId,
  characters,
}) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [alreadyExist, setAlreadyExist] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  useEffect(() => {
    setTitle(characters.find((item) => item.id == todoId).title);
    setDescription(characters.find((item) => item.id == todoId).description);
    console.log(characters.find((item) => item.id == todoId));
  }, [todoId]);

  async function handleSave() {
    try {
      const findData = characters.find((item) => {
        if (item.id == todoId) {
          return item;
        } else {
          return null;
        }
      });

      const findTitle = characters.find((item) => {
        if (item.title == title) {
          return true;
        } else {
          return false;
        }
      });

      if (
        title === "" ||
        title === undefined ||
        title === null ||
        title === " "
      ) {
        setAlreadyExist(true);
        return;
      } else if (
        description === "" ||
        description === undefined ||
        description === null ||
        description === " "
      ) {
        setDescriptionError(true);
        return;
      }

      if (findData) {
        const data = {
          ...findData,
          title: title,
          description: description,
          AddedDate: Date.now(),
        };

        const newData = characters.map((item) => {
          if (item.id == todoId) {
            return data;
          } else {
            return item;
          }
        });
        console.log(newData);
        setCharacters(newData);
        setMainObj({ ...mainObj, todos: newData });
        fetch(`http://localhost:8080/users/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...mainObj, todos: newData }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            toast({
              title: "Success",
              description: "Data updated successfully",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            onClose();
          });
      } else {
        console.log("no data found");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div>
        <CiEdit className="edit" onClick={onOpen} />
      </div>

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
                defaultValue={title}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setAlreadyExist(false);
                }}
              />
              {alreadyExist && (
                <p style={{ color: "red" }}>Please enter Input</p>
              )}
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
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default UpdateModle;
