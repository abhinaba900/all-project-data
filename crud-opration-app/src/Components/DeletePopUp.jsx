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
} from "@chakra-ui/react";
import { AuthContext } from "../AuthContext/AuthContext";
import Massages from "./Massages";

function DeletePopUp({ id, role }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("userId")) || false
  );
  const {
    allData,
    setAllData,
    setCurrentItems,
    currentPage,
    itemsPerPage,
    groups,
    setGroups,
    items,
    setRender,
    setMessages,
    messages,
  } = React.useContext(AuthContext);
  const [isAdmin, setIsAdmin] = React.useState();
  useEffect(() => {
    allData.find((item) => {
      if (item.id === user) {
        setIsAdmin(item.isAdmin);
      }
      return "";
    });
  }, [allData]);
 async function handleDelete() {
   try {
     if (role === "group") {
       const response = await fetch(`http://localhost:8080/groups/${id}`, {
         method: "DELETE",
         headers: {
           "Content-Type": "application/json",
         },
       });

       if (!response.ok) {
         throw new Error("Failed to delete group");
       }

       const groupData = await response.json();
       console.log("Success:", groupData);

       const findFromItems = items.filter((item) => item.groupId === id);
       const deleteRequests = findFromItems.map((item) =>
         fetch(`http://localhost:8080/memberofgroup/${item.id}`, {
           method: "DELETE",
           headers: {
             "Content-Type": "application/json",
           },
         })
       );

       await Promise.all(deleteRequests);
       console.log("Members deleted successfully");

       const slicedData = groups.filter((item) => item?.id !== groupData?.id);
       setGroups(slicedData);
       setRender(Math.random());
     }else if (role === "message") {
       const response = await fetch(`http://localhost:8080/masseges/${id}`, {
         method: "DELETE",
       });
       if (!response.ok) {
         throw new Error("Failed to delete message");
       }
       const messageData = await response.json();
       console.log("delete success:", messageData);

       setMessages(messages?.filter((item) => item?.id!== messageData?.id));

      onclose();

     }
     else {
       const response = await fetch(`http://localhost:8080/users/${id}`, {
         method: "DELETE",
       });

       if (!response.ok) {
         throw new Error("Failed to delete user");
       }

       const userData = await response.json();
       console.log("Success:", userData);

       const slicedData = allData.filter((item) => item?.id !== userData?.id);
       setAllData(slicedData);
       setCurrentItems(slicedData.slice(currentPage, itemsPerPage));
     }
   } catch (error) {
     console.error("Error:", error);
   } finally {
     onClose();
   }
 }


  return (
    <div>
      <Button
        onClick={onOpen}
        bg={"#FF0000"}
        color={"white"}
        isDisabled={!isAdmin}
      >
        Delete
      </Button>

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
