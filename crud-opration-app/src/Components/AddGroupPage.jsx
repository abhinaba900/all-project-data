import React, { useState, useContext } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
  Select,
} from "@chakra-ui/react";
import { AuthContext } from "../AuthContext/AuthContext";

function AddGroupPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { allData, items, setItems, setRender } = useContext(AuthContext);

  const [userData, setUserData] = useState({
    name: "",
    image: "",
    category: "",
  });

  const [selectedUsers, setSelectedUsers] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to add group");
      }

      const data = await response.json();
      console.log(selectedUsers, "selectedUsers in add group");

      for (let i = 0; i < selectedUsers.length; i++) {
        await fetch(`http://localhost:8080/memberofgroup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: selectedUsers[i],
            groupId: data.id,
          }),
        })
          .then((response) => response.json().then((data) => console.log(data,"after add member")))
          .catch((error) => console.error("Error:", error));
      }

      const updatedMembersResponse = await fetch(
        "http://localhost:8080/memberofgroup",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const updatedMembersData = await updatedMembersResponse.json();

      const newItems = updatedMembersData.filter(
        (item) => item.groupId === data.id
      );

      setItems([...items, ...newItems]);
      setRender(Math.random());
      setSelectedUsers([]);
      setUserData({ name: "", image: "", category: "" });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      onClose();
    }
  };

  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(userId)) {
        return prevSelectedUsers.filter((id) => id !== userId);
      } else {
        return [...prevSelectedUsers, userId];
      }
    });
  };

  const handleMainChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
      risk_rate: Math.floor(Math.random() * 100),
    });
  };

  return (
    <>
      <Button className="add-group-btn" onClick={onOpen}>
        Add Group
      </Button>

      <Modal isOpen={isOpen} size="xl" onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="custom-modal-content">
          <ModalHeader className="custom-modal-header">Add Group</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form className="form-group" onSubmit={handleSubmit}>
              <label className="input-label">
                <h5>Group Name:</h5>
                <Input
                  type="text"
                  name="name"
                  className="input-field"
                  value={userData.name}
                  onChange={handleMainChange}
                  required
                />
              </label>

              <div>
                <h5>User Choices:</h5>
                <div className="checkbox">
                  {allData.map((user) => (
                    <div key={user.id}>
                      <input
                        type="checkbox"
                        name={user.name}
                        id={user.id}
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleCheckboxChange(user.id)}
                      />{" "}
                      {user.name}
                    </div>
                  ))}
                </div>
              </div>

              <label className="input-label">
                <h5>Group Image Icon:</h5>
                <Input
                  type="url"
                  name="image"
                  className="input-field"
                  value={userData.image}
                  onChange={handleMainChange}
                  required
                />
              </label>

              <label className="input-label">
                <h5>Group Preference:</h5>
                <Select
                  placeholder="Select option"
                  width="100%"
                  name="category"
                  className="input-field"
                  value={userData.category}
                  onChange={handleMainChange}
                  required
                >
                  <option value="Drugs">Drugs</option>
                  <option value="gun">Guns</option>
                  <option value="other">Other</option>
                </Select>
              </label>

              <Button className="submit-btn" type="submit">
                Submit
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddGroupPage;
