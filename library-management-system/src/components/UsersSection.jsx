import React, { useEffect } from "react";
import "./Css/UsersSection.scss";
import { Button } from "@chakra-ui/react";
import { AuthContext } from "../authContext/AuthContext";
import { FaEye, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import AddDetelsPage from "./AddDetelsPage";
import EditAndSee from "./EditAndSee";
import DeletePopUp from "./DeletePopUp";

function UsersSection() {
  const { allUsers, handleRerander, rerander } = React.useContext(AuthContext);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [usersPerPage] = React.useState(5);
  const [currentUsers, setCurrentUsers] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchActive, setSearchActive] = React.useState(false);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers2 = allUsers?.users?.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const [filteredUsers, setFilteredUsers] = React.useState(allUsers.users);

  useEffect(() => {
    const timer = setTimeout(() => {
      const filteredUsers = allUsers.users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (searchTerm === "") {
        setCurrentUsers(currentUsers2);
        setSearchActive(false);
      } else {
        setCurrentUsers(filteredUsers.slice(indexOfFirstUser, indexOfLastUser));
        setSearchActive(true);
        setFilteredUsers(filteredUsers);
        setCurrentPage(1);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, currentPage, usersPerPage, allUsers.users, rerander]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < Math.ceil(allUsers.users.length / usersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleActiveBorrows = (user) => {
    const activeBorrows = allUsers?.allRecords?.filter(
      (users) => users.user_id === user
    );
    if (activeBorrows.length > 0) {
      const temp = activeBorrows.filter((users) => users.active === true);
      return temp.length;
    }
    return 0;
  };

  const handleTotalBorrows = (user) => {
    const activeBorrows = allUsers?.allRecords?.filter(
      (users) => users.user_id === user
    );
    if (activeBorrows.length > 0) {
      const temp = activeBorrows.filter((users) => users.active === false);
      return temp.length;
    }
    return 0;
  };

  const [selectedRow, setSelectedRow] = React.useState(-1);

  const handleRowClick = (index) => {
    setSelectedRow(index);
  };
  return (
    <div className="users-section">
      <div className="users-section-heading">
        <h2>Member List</h2>
        <AddDetelsPage user="users" />
      </div>
      <hr />
      <div className="users-table-wrapper">
        <div className="search-container">
          <label htmlFor="search-by-name">Search: </label>
          <input
            type="search"
            name="name"
            id="search-by-name"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <table className="users-table table table-success table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Library Id</th>
            <th scope="col">Mobile</th>
            <th scope="col">Total Borrows</th>
            <th scope="col">Active Borrows</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers?.map((user, index) => (
            <tr
              key={user.id}
              className={selectedRow === index ? "table-primary" : ""}
              onClick={() => handleRowClick(index)}
            >
              <td scope="row" className="name">
                {user?.name}
              </td>
              <td scope="row">{user?.libraryId}</td>
              <td scope="row">{user?.phone}</td>
              <td scope="row">{handleTotalBorrows(user?.id)}</td>
              <td scope="row">{handleActiveBorrows(user?.id)}</td>
              <td className="action-btn" scope="row">
                <EditAndSee role="see" user={"user"} id={user?.id} />
                <EditAndSee role="edit" user={"user"} id={user?.id} />
                <DeletePopUp role="user delete" user={"user"} id={user?.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="pagination">
        <div style={{ fontWeight: "bold" }}>
          Sowing {currentUsers.length >= 1 ? indexOfFirstUser + 1 : 0} to{" "}
          {indexOfLastUser >
          (searchActive ? filteredUsers.length : allUsers.users.length)
            ? searchActive
              ? filteredUsers.length
              : allUsers.users.length
            : indexOfLastUser}{" "}
          of {searchActive ? filteredUsers.length : allUsers.users.length}{" "}
          entries
        </div>
        <div className="pagination-btn-container">
          <Button onClick={prevPage} isDisabled={currentPage === 1}>
            Prev
          </Button>
          {Array.from({
            length: Math.ceil(
              (searchActive ? filteredUsers.length : allUsers.users.length) /
                usersPerPage
            ),
          }).map((_, index) => (
            <Button key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </Button>
          ))}
          <Button
            onClick={nextPage}
            isDisabled={
              searchActive
                ? currentPage === Math.ceil(filteredUsers.length / usersPerPage)
                : currentPage ===
                  Math.ceil(allUsers.users.length / usersPerPage)
            }
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UsersSection;
