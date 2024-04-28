import React, { useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { AuthContext } from "../authContext/AuthContext";
import { FaEye, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function CloseRecordSection() {
  const { allUsers, handleRerander, rerander } = React.useContext(AuthContext);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [usersPerPage] = React.useState(5);
  const [currentUsers, setCurrentUsers] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchActive, setSearchActive] = React.useState(false);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  // Make sure allUsers and allRecords are defined before using them
  const currentUsers2 = allUsers?.allRecords
    ?.filter((user) => user?.active === false)
    ?.slice(indexOfFirstUser, indexOfLastUser);

  // Add a check for allUsers and allRecords to prevent accessing undefined properties
  const [filteredUsers, setFilteredUsers] = React.useState(
    allUsers?.allRecords?.filter((user) => user?.active === false) || []
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const filteredUsers = allUsers?.allRecords?.filter(
        (user) =>
          user?.active === false &&
          allUsers?.users
            ?.find((u) => u?.id === user?.user_id)
            ?.name?.toLowerCase()
            ?.includes(searchTerm.toLowerCase())
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
  }, [searchTerm, currentPage, usersPerPage, allUsers?.allRecords]);

  // Add a check for allUsers to prevent accessing undefined properties
  const nextPage = () => {
    if (
      currentPage <
      Math.ceil(
        (allUsers?.allRecords || []).filter((user) => user.active === false)
          .length / usersPerPage
      )
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Add a check for currentPage to prevent negative values
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const formatDate = (inputDate) => {
    const dateParts = inputDate?.split("-");
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];
    const date = new Date(year, month - 1, day);

    const formattedDay = String(date.getDate()).padStart(2, "0");
    const formattedMonth = String(date.getMonth() + 1).padStart(2, "0");
    const formattedYear = date.getFullYear();

    return `${formattedDay}-${formattedMonth}-${formattedYear}`;
  };

  const [selectedRow, setSelectedRow] = React.useState(-1);

  const handleRowClick = (index) => {
    setSelectedRow(index);
  };

  return (
    <div className="users-section">
      <div className="users-section-heading">
        <h2>Closed Record List</h2>
      </div>
      <hr />
      <div className="users-table-wrapper">
        <div className="search-container">
          <label htmlFor="search-by-name">Search: </label>
          <input
            type="search"
            name="name"
            id="search-by-name"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name"
            value={searchTerm}
          />
        </div>
      </div>
      <table className="users-table table table-success table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Book</th>
            <th scope="col">Author</th>
            <th scope="col">Issued on</th>
            <th scope="col">Due Date</th>
            <th scope="col">Returned Date</th>
            <th scope="col">Fine (in Rs.)</th>
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
                {allUsers?.users?.find((u) => u?.id === user?.user_id)?.name}
              </td>
              <td scope="row" className="name">
                {allUsers?.books?.find((u) => u?.id === user?.book_id)?.name}
              </td>
              <td scope="row">
                {allUsers?.books?.find((u) => u?.id === user?.book_id)?.author}
              </td>
              <td scope="row">{formatDate(user?.issueDate)}</td>
              <td scope="row">{formatDate(user?.dueDate)}</td>
              <td scope="row">{formatDate(user?.returnDate)}</td>
              <td scope="row">{user?.fine}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="pagination">
        <div style={{ fontWeight: "bold" }}>
          Sowing {currentUsers.length >= 1 ? indexOfFirstUser + 1 : 0} to{" "}
          {indexOfLastUser >
          (searchActive
            ? filteredUsers.length
            : (allUsers?.allRecords || []).filter(
                (user) => user?.active === false
              ).length)
            ? searchActive
              ? filteredUsers.length
              : (allUsers?.allRecords || []).filter(
                  (user) => user?.active === false
                ).length
            : indexOfLastUser}{" "}
          of{" "}
          {searchActive
            ? filteredUsers.length
            : (allUsers?.allRecords || []).filter(
                (user) => user?.active === false
              ).length}{" "}
          entries
        </div>
        <div className="pagination-btn-container">
          <Button onClick={prevPage} isDisabled={currentPage === 1}>
            Prev
          </Button>
          {Array.from({
            length: Math.ceil(
              (searchActive
                ? filteredUsers.length
                : (allUsers?.allRecords || []).filter(
                    (user) => user?.active === false
                  ).length) / usersPerPage
            ),
          }).map((_, index) => (
            <Button key={index} onClick={() => setCurrentPage(index + 1)}>
              {index + 1}
            </Button>
          ))}
          <Button
            onClick={nextPage}
            isDisabled={
              searchActive
                ? currentPage === Math.ceil(filteredUsers.length / usersPerPage)
                : currentPage ===
                  Math.ceil(
                    (
                      (allUsers?.allRecords || []).filter(
                        (user) => user?.active === false
                      ) || []
                    ).length / usersPerPage
                  )
            }
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CloseRecordSection;
