import React, { useEffect } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import SingleGallery from "./SingleGalary";
import DeletePopUp from "./DeletePopUp";
import { Select, Input } from "@chakra-ui/react";
import AddGroupPage from "./AddGroupPage";
import { useNavigate } from "react-router-dom";

function Groups() {
  const navigate = useNavigate();
  const {
    allData,
    groups,
    allGroups,
    setAllGroups,
    items,
    setActive,
    clickAndActiveGroup,
    setClickAndActiveUser,
  } = React.useContext(AuthContext);
  const [searchQuery, setSearchQuery] = React.useState("");
  console.log(clickAndActiveGroup, "clickAndActiveGroup");


  useEffect(() => {
    try {
      const timeout = setTimeout(() => {
        if (searchQuery === "") {
          setAllGroups(groups);
        } else {
          const filteredGroups = groups?.filter(
            (group) =>
              group?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              group?.category?.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setAllGroups(filteredGroups);
        }
      }, 500);

      return () => clearTimeout(timeout);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }, [searchQuery]);

  const handleFilterChange = (e) => {
    const filteredGroups = groups.filter(
      (group) => group.category === e.target.value
    );
    if (e.target.value === "") {
      setAllGroups(groups);
    } else {
      setAllGroups(filteredGroups);
    }
  };

  const filterUser = (id) => {
    const findFromItems = items.filter((item) => item.groupId === id);
    const users = findFromItems.map((item) => {
      const user = allData.find((userData) => userData.id === item.userId);
      return user ? user.name : "";
    });

    return (
      <div>
        {users.map((userName, index) => (
          <div key={index}>
            <li>{userName}</li>
          </div>
        ))}
      </div>
    );
  };

  function returnMedia(id) {
    const findFromItems = items.filter((item) => item.groupId === id);
    const medias = findFromItems.map(
      (item) => allData.find((media) => media.id === item.userId).media
    );

    return medias.flat();
  }

  const findIndexOfUser = (id) => {
    const findFromItems = items?.filter((item) => item?.groupId === id);
    const users = findFromItems?.map(
      (item) => allData?.find((userData) => userData?.id === item?.userId)?.id
    );
    setClickAndActiveUser(users);
  };
  return (
    <div>
      <h2 style={{ textAlign: "center", fontWeight: "bold", fontSize: "30px" }}>
        Groups
      </h2>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            gap: "1em",
            alignItems: "center",
          }}
        >
          <Select
            placeholder="Select option"
            width="300px"
            onChange={(e) => handleFilterChange(e)}
          >
            <option value="Drugs">Drugs</option>
            <option value="gun">Guns</option>
            <option value="other">Other</option>
          </Select>
          <Input
            type="search"
            w={"300px"}
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
          <AddGroupPage />
        </div>
        <table className="table table-black table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Group Name</th>
              <th scope="col">Image</th>
              <th scope="col">Members</th>
              <th scope="col">Media</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allGroups?.map((group) => (
              <tr
                key={group.id}
                style={{ cursor: "pointer" }}
                className={`${
                  clickAndActiveGroup?.find((item) => {
                    if (item?.id === group?.id) {
                      return true;
                    }
                    return false;
                  })
                    ? "table-warning"
                    : ""
                }`}
              >
                <td onClick={() => navigate(`/group/${group?.id}`)}>
                  {group.name}
                </td>
                <td>
                  <img
                    src={group.image}
                    alt={group.name}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      display: "block",
                      margin: "auto",
                      borderRadius: "50%",
                    }}
                    onClick={() => navigate(`/group/${group?.id}`)}
                  />
                </td>
                <td
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setActive("Users");
                    findIndexOfUser(group.id);
                  }}
                >
                  {filterUser(group.id)}
                </td>
                <td style={{ textAlign: "center", cursor: "pointer" }}>
                  <SingleGallery
                    role={"group"}
                    itemsOfGroup={returnMedia(group.id)}
                    id={group.id}
                  />
                </td>
                <td>
                  <DeletePopUp role={"group"} id={group.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Groups;
