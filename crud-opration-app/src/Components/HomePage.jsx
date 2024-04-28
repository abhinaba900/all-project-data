import React, { useEffect, useState } from "react";
import "./Css/HomePage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Navigate, useNavigate } from "react-router-dom";
import DeletePopUp from "./DeletePopUp";
import { Button, Input } from "@chakra-ui/react";
import { AuthContext } from "../AuthContext/AuthContext";
import SideMenu from "./Sidebar";
import Dashboard from "./Dashboard";
import Media from "./Media";
import SingleGalary from "./SingleGalary";
import Groups from "./Groups";
import Massages from "./Massages";

function HomePage() {
  const navigate = useNavigate();
  const {
    setAllUserData,
    allData,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    active,
    setImageData,
    currentItems,
    setCurrentItems,
    items,
    groups,
    setActive,
    clickAndActiveUser,
    setClickAndActiveGroup,
  } = React.useContext(AuthContext);
  const [login, setLogin] = React.useState(
    JSON.parse(localStorage.getItem("login")) || false
  );
  const [userId, setUserId] = React.useState(
    JSON.parse(localStorage.getItem("userId")) || false
  );
  const [isAdmin, setIsAdmin] = React.useState(false);

  const [inputValue, setInputValue] = useState("");
  const [paginationUserData, setPaginationUserData] = useState([]);

  useEffect(() => {
    allData.find((item) => {
      if (item.id === userId) {
        setIsAdmin(item.isAdmin);
      }
      return false;
    });
    setPaginationUserData(allData);
  }, [allData, isAdmin, userId]);

  //debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      const filteredData = allData.filter((item) =>
        item.name.toLowerCase().includes(inputValue.toLowerCase())
      );

      if (inputValue.length > 0) {
        setPaginationUserData(filteredData);
        setCurrentPage(1);
      } else {
        setPaginationUserData(allData);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleNavigate = (id) => {
    const user = allData.find((user) => user.id === id);
    setAllUserData(user);
    navigate("/signup/" + id);
  };

  const totalPages = Math.ceil(paginationUserData.length / itemsPerPage);
  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentItems(
      paginationUserData.slice(indexOfFirstItem, indexOfLastItem)
    );
  }, [currentPage, itemsPerPage, paginationUserData, setCurrentItems]);

  const findGroups = (id) => {
    const findFromItems = items.filter((item) => item.userId === id);

    if (findFromItems.length > 0) {
      const groupIds = findFromItems.map((item) => item.groupId);
      const findGroup = groups.filter((group) => groupIds.includes(group.id));
      return (
        <ul>
          {findGroup.map((group) => (
            <li key={group.id}>{group.name}</li>
          ))}
        </ul>
      );
    } else {
      return "No Group";
    }
  };

  function handleFindGroupsForRedirectGroupPage(id) {
    const findFromItems = items.filter((item) => item.userId === id);

    const groupIds = findFromItems.map((item) => item.groupId);

    const findGroup = groups.filter((group) => groupIds.includes(group.id));
    console.log(findGroup, "findFromItems");
    if (findGroup) {
      setClickAndActiveGroup(findGroup);
    }
  }

  if (!login) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="HomePage">
        <div className="sidebar">
          <div>
            <h1 style={{ fontSize: "1.2em" }}>
              Welcome{" "}
              <span
                style={{
                  color: "green",
                  textTransform: "capitalize",
                  textDecoration: "underline",
                }}
              >
                {allData.find((item) => item.id === userId)?.name}
              </span>
            </h1>
            <SideMenu isAdmin={isAdmin} />
          </div>
          <button
            className="logoutbutton sidebarLogoutButton btn btn-secondary"
            onClick={() => {
              navigate("/");
              localStorage.removeItem("login");
              localStorage.removeItem("userId");
              setAllUserData({
                email: "",
                password: "",
                name: "",
                phone: "",
                address: "",
                image: "",
              });
            }}
          >
            Log Out
          </button>
        </div>

        {active === "Users" && (
          <div>
            <div className="add-user-and-filter-wrapper">
              {isAdmin && (
                <div>
                  <div className="addUser">
                    <Button
                      onClick={() => {
                        setAllUserData({
                          email: "",
                          password: "",
                          name: "",
                          phone: "",
                          address: "",
                          image: "",
                          isAdmin: false,
                        });
                        setImageData(
                          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC"
                        );
                        navigate("/signup");
                      }}
                      className="button"
                    >
                      Add User
                    </Button>
                  </div>
                </div>
              )}
              <div className="search-function">
                <label>
                  <Input
                    type="text"
                    id="search"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Search something..."
                  />
                </label>
              </div>
              <div className="pagination">
                <Button
                  onClick={() => {
                    setCurrentPage(currentPage - 1);
                  }}
                  isDisabled={currentPage === 1}
                >
                  Prev
                </Button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <Button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={currentPage === index + 1 ? "active" : ""}
                    m={0}
                    p={0}
                    display={"block"}
                  >
                    {index + 1}
                  </Button>
                ))}
                <Button
                  onClick={() => {
                    setCurrentPage(currentPage + 1);
                  }}
                  isDisabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
              <div>
                <select
                  name="data-count"
                  id="select-option-filter"
                  onChange={(e) => setItemsPerPage(e.target.value)}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                </select>
              </div>
            </div>
            <table className="table table-black table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Phone No</th>
                  <th scope="col">Email Id</th>
                  <th scope="col">Groups</th>
                  <th scope="col">Image</th>
                  <th scope="col">Media</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((user, index) => (
                  <tr
                    key={user.id}
                    style={{ cursor: "pointer" }}
                    className={`${
                      clickAndActiveUser?.find((id) => {
                        if (id === user?.id) {
                          return true;
                        } else {
                          return false;
                        }
                      })
                        ? "table-warning"
                        : ""
                    }`}
                  >
                    <th
                      scope="row"
                      {...(isAdmin || userId === user.id
                        ? { onClick: () => navigate("/home/" + user.id) }
                        : {})}
                    >
                      {index + 1}
                    </th>
                    <td
                      {...(isAdmin || userId === user.id
                        ? { onClick: () => navigate("/home/" + user.id) }
                        : {})}
                    >
                      {user.name}
                    </td>
                    <td
                      {...(isAdmin || userId === user.id
                        ? { onClick: () => navigate("/home/" + user.id) }
                        : {})}
                    >
                      {user.phone}
                    </td>
                    <td
                      {...(isAdmin || userId === user.id
                        ? { onClick: () => navigate("/home/" + user.id) }
                        : {})}
                    >
                      {user.email}
                    </td>
                    <td
                      onClick={() => {
                        setActive("Group");
                        handleFindGroupsForRedirectGroupPage(user.id);
                      }}
                    >
                      {findGroups(user.id)}
                    </td>
                    <td
                      {...(isAdmin || userId === user.id
                        ? { onClick: () => navigate("/home/" + user.id) }
                        : {})}
                    >
                      <img
                        src={user.img}
                        width="80px"
                        style={{
                          borderRadius: "50%",
                          objectFit: "contain",
                          display: "block",
                          margin: "auto",
                        }}
                      />
                    </td>
                    <td>
                      <SingleGalary id={user.id} />
                    </td>
                    <td>
                      <div className="action">
                        <Button
                          isDisabled={!isAdmin && userId !== user.id}
                          onClick={() => handleNavigate(user.id)}
                          style={{ position: "relative", zIndex: "9999" }}
                        >
                          Edit
                        </Button>
                        <DeletePopUp
                          id={user.id}
                          key={user.id}
                          isAdmin={user?.isAdmin}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {active === "Dashboard" && <Dashboard />}
        {active === "Media" && <Media />}
        {active === "Group" && <Groups />}
        {active === "Massages" && <Massages />}
      </div>
      {/* Pagination */}
    </>
  );
}

export default HomePage;
