import React from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import { Button } from "@chakra-ui/react";
import DeletePopUp from "./DeletePopUp";

function Massages() {
  const {
    messages,
    allGroups,
    allData,
    setClickAndActiveGroup,
    setClickAndActiveUser,
    setActive,
  } = React.useContext(AuthContext);
  console.log(messages, "messages");

  const findIndexOfUser = (id) => {
    const users = messages?.map(
      (item) => allData?.find((userData) => userData?.id === item?.memberId)?.id
    );
    setClickAndActiveUser(users);
  };
  return (
    <div>
      <h2 style={{ textAlign: "center", fontWeight: "bold", fontSize: "30px" }}>
        Massages
      </h2>
      <div>
        <table className="table table-black table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Massage</th>
              <th scope="col">Group</th>
              <th scope="col">Members</th>
              <th scope="col">Media Type</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages?.map((message) => (
              <tr key={Math.random()}>
                <td scope="row">{message?.chat}</td>
                <td
                  scope="row"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setClickAndActiveGroup([
                      allGroups?.find((group) => group.id === message?.groupId),
                    ]);
                    setActive("Group");
                  }}
                >
                  {
                    allGroups?.find((group) => group.id === message?.groupId)
                      ?.name
                  }
                </td>
                <td
                  scope="row"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    findIndexOfUser(message?.memberId);
                    setActive("Users");
                  }}
                >
                  {allData?.find((data) => data.id === message?.memberId)?.name}
                </td>

                <td scope="row">{message?.chatType}</td>
                <td>
                  <DeletePopUp id={message?.id} role="message" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Massages;
