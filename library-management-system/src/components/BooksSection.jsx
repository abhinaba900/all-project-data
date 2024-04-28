import React, { useEffect } from "react";
import "./Css/BooksSection.scss";
import { Button } from "@chakra-ui/react";
import { AuthContext } from "../authContext/AuthContext";
import EditAndSee from "./EditAndSee";
import AddDetelsPage from "./AddDetelsPage";
import DeletePopUp from "./DeletePopUp";
function BooksSection() {
  const { allUsers, stockAvalable, rerander } = React.useContext(AuthContext);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [usersPerPage] = React.useState(5);
  const [currentUsers, setCurrentUsers] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchActive, setSearchActive] = React.useState(false);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers2 = allUsers?.books?.slice(
    indexOfFirstUser,
    indexOfLastUser
  );
  const [filteredUsers, setFilteredUsers] = React.useState(allUsers?.books);
  
  const [selectedRow, setSelectedRow] = React.useState(-1);
  useEffect(() => {
    const timer = setTimeout(() => {
      const filteredUsers = allUsers.books.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (searchTerm === "") {
        setCurrentUsers(currentUsers2);
        setSearchActive(false);
      } else {
        setCurrentUsers(filteredUsers.slice(indexOfFirstUser, indexOfLastUser));
        setSearchActive(true);
        setFilteredUsers(filteredUsers);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [
    searchTerm,
    currentPage,
    usersPerPage,
    allUsers.books,
    rerander,
    searchActive,
  ]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < Math.ceil(allUsers.books.length / usersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const checkAvailable = (stock, id, index) => {
    const filterStock = allUsers?.allRecords?.filter(
      (user) => user.book_id === id
    );
    if (filterStock.length > 0) {
      const temp = filterStock.filter((user) => user.active === true);
      if (temp.length > 0) {
        return stock - temp.length;
      }
    }

    return stock;
  };
  const handleRowClick = (index) => {
    setSelectedRow(index);
  };

  return (
    <div className="users-section">
      <div className="users-section-heading">
        <h2>Book List</h2>
        <AddDetelsPage user="books" />
      </div>
      <hr />
      <div className="users-table-wrapper">
        <div className="search-container">
          <label htmlFor="search-by-name">Search: </label>
          <input
            type="search"
            name="name"
            id="search-by-name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <table className="users-table table table-success table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Author</th>
            <th scope="col">Genre</th>
            <th scope="col">Stock</th>
            <th scope="col">Available</th>
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
              <td scope="row">{user?.author}</td>
              <td scope="row">{user?.genre}</td>
              <td scope="row">{user?.stock}</td>
              <td scope="row">{checkAvailable(user?.stock, user.id, index)}</td>
              <td className="action-btn" scope="row">
                <EditAndSee role={"edit"} user={"books"} id={user?.id} />

                <DeletePopUp
                  role={"Books delete"}
                  id={user?.id}
                  user={"books"}
                />
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
          (searchActive ? filteredUsers.length : allUsers.books.length)
            ? searchActive
              ? filteredUsers.length
              : allUsers.books.length
            : indexOfLastUser}{" "}
          of {searchActive ? filteredUsers.length : allUsers.books.length}{" "}
          entries
        </div>
        <div className="pagination-btn-container">
          <Button onClick={prevPage} isDisabled={currentPage === 1}>
            Prev
          </Button>
          {Array.from({
            length: Math.ceil(
              (searchActive ? filteredUsers.length : allUsers.books.length) /
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

export default BooksSection;
