import React, { useEffect } from "react";
import { Button, useToast } from "@chakra-ui/react";
import { AuthContext } from "../authContext/AuthContext";
import AddDetelsPage from "./AddDetelsPage";

function OpenRecordSection() {
  const { allUsers, handleRerander } = React.useContext(AuthContext);
  const toast = useToast();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [usersPerPage] = React.useState(5);
  const [currentUsers, setCurrentUsers] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers2 = allUsers?.allRecords
    ?.filter((user) => user.active === true)
    .slice(indexOfFirstUser, indexOfLastUser);

  const [filteredUsers, setFilteredUsers] = React.useState(
    allUsers?.allRecords.filter((user) => user.active === true)
  );
  const [searchActive, setSearchActive] = React.useState(false);
  const [inputFilled, setInputFilled] = React.useState(
    allUsers?.allRecords?.filter((user) => user.active === true).map(() => "")
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const filteredUsers = allUsers.allRecords.filter(
        (users) =>
          users?.active === true &&
          allUsers?.users
            ?.find((user) => user.id === users.user_id)
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (
      currentPage <
      Math.ceil(
        allUsers?.allRecords?.filter((user) => user.active === true).length /
          usersPerPage
      )
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleAction = async (id, fine, index) => {
    try {
      if (inputFilled[index] === "") {
        toast({
          description: "Please fill The Return Date Field.",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const updatedUser = allUsers?.allRecords?.map((user) => {
        if (user?.id === id) {
          return {
            ...user,
            active: false,
            fine: fine,
          };
        }
        return user;
      });

      await fetch(`http://localhost:5000/allRecords/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          active: false,
          fine: fine,
          returnDate: inputFilled[index],
        }),
      });

      // Assuming you have a function like setAllUsers in your context
      handleRerander(Math.random()); // Assuming this function will re-fetch the updated user data
      toast({
        title: "Action Successful",
        description: "User updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setInputFilled((prevInputFilled) => {
        const newInputFilled = [...prevInputFilled];
        newInputFilled[index] = "";
        return newInputFilled;
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to update user.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const formatDate = (inputDate) => {
    const dateParts = inputDate.split("-");
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];
    const date = new Date(year, month - 1, day);

    const formattedDay = String(date.getDate()).padStart(2, "0");
    const formattedMonth = String(date.getMonth() + 1).padStart(2, "0");
    const formattedYear = date.getFullYear();

    return `${formattedDay}-${formattedMonth}-${formattedYear}`;
  };

  const handleFine = (dueDate, returnDate, index) => {
    setInputFilled((prevInputFilled) => {
      const newInputFilled = [...prevInputFilled];
      newInputFilled[index] = `${returnDate}`;
      return newInputFilled;
    });
    const currentDate = new Date();
    const due = new Date(dueDate);
    const returned = new Date(returnDate);
    const daysOverdue = Math.ceil((returned - due) / (1000 * 60 * 60 * 24));

    return daysOverdue > 0 ? daysOverdue : 0;
  };

  const [selectedRow, setSelectedRow] = React.useState(-1);

  const handleRowClick = (index) => {
    setSelectedRow(index);
  };

  return (
    <div className="users-section">
      <div className="users-section-heading">
        <h2>Open Records</h2>
        <AddDetelsPage user="Open Records" />
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
                {allUsers?.users?.find((u) => u?.id === user?.user_id)?.name}
              </td>
              <td scope="row" className="name">
                {allUsers?.books?.find((u) => u?.id === user?.book_id)?.name}
              </td>
              <td scope="row">
                {allUsers?.books?.find((u) => u?.id === user?.book_id)?.author}
              </td>
              <td scope="row" className="reverse">
                {formatDate(user?.issueDate)}
              </td>
              <td scope="row" className="reverse">
                {formatDate(user?.dueDate)}
              </td>
              <td scope="row">
                <input
                  type="date"
                  name="returnDate"
                  id="returnDate"
                  min={user?.issueDate}
                  onChange={(e) => {
                    const fine = handleFine(
                      user.dueDate,
                      e.target.value,
                      index
                    );
                    // Update fine in the current user object
                    user.fine = fine;
                    // Trigger a re-render
                    setCurrentUsers([...currentUsers]);
                  }}
                />
              </td>
              <td scope="row">{user?.fine}</td>
              <td className="action-btn" scope="row">
                <Button
                  className="action-btn-view"
                  onClick={() => handleAction(user.id, user?.fine, index)}
                >
                  {user?.fine > 0 ? "Pay" : "Return"}
                </Button>
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
          (searchActive
            ? filteredUsers.length
            : allUsers?.allRecords?.filter((user) => user?.active === true)
                .length)
            ? searchActive
              ? filteredUsers.length
              : allUsers?.allRecords?.filter((user) => user?.active === true)
                  .length
            : indexOfLastUser}{" "}
          of{" "}
          {searchActive
            ? filteredUsers.length
            : allUsers?.allRecords?.filter((user) => user?.active === true)
                .length}{" "}
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
                : allUsers?.allRecords?.filter((user) => user?.active === true)
                    .length) / usersPerPage
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
                    allUsers?.allRecords?.filter(
                      (user) => user?.active === true
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

export default OpenRecordSection;
