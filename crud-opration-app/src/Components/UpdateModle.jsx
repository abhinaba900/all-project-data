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
import Datas from "../db.json";
import { AuthContext } from "../AuthContext/AuthContext";
import validator from "validator";
import { useToast } from "@chakra-ui/react";

function UpdateModle({ id }) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { email: contextEmail, fullName: contextFullName } =
    useContext(AuthContext);
  const [email, setEmail] = useState(contextEmail);
  const [fullName, setFullName] = useState(contextFullName);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  useEffect(() => {
    if (isOpen) {
      const useer = Datas.users.find((user) => user.id === id);
      setEmail(useer.email);
      setFullName(useer.name);
    }
  }, [isOpen, contextEmail, contextFullName]);

  const handleSave = async () => {
    try {
      if (!validator.isEmail(email)) {
        toast({
          title: "Error",
          description: "Invalid Email",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        await fetch(`http://localhost:3000/users/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, name: fullName }),
        });
        onClose();
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div>
      <Button onClick={onOpen} bg={"#FFFF00"}>
        Edit
      </Button>

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
              <FormLabel>Name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Full Name"
                defaultValue={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
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
