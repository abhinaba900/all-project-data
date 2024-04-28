import React, { useState, useEffect } from "react";
import "./Css/HomePage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DeletePopUp from "./DeletePopUp";
import { Switch } from "@chakra-ui/react";
import UpdateModle from "./UpdateModle";
import { AiOutlineLogout } from "react-icons/ai";
import { useToast } from "@chakra-ui/react";
import AddTodo from "./AddTodo";

function HomePage() {
  const user = JSON.parse(localStorage.getItem("userId"));
  const navigate = useNavigate();
  const { login, setLogin } = React.useContext(AuthContext);
  const [characters, setCharacters] = useState([]);
  const [mainObj, setMainObj] = useState({});
  const [filterdData, setFilterdData] = useState([]);
  const [active, setActive] = React.useState({});
  const [filter, setFilter] = React.useState("all");

  useEffect(() => {
    switch (filter) {
      case "all":
        setFilterdData(characters);
        break;
      case "completed":
        setFilterdData(characters.filter((item) => item.status === true));
        break;
      case "uncompleted":
        setFilterdData(characters.filter((item) => item.status === false));
        break;
      default:
        break;
    }
  }, [filter, characters, setCharacters, setFilterdData]);

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/users`);
        if (!response.ok) {
          throw new Error("Failed to fetch todos.");
        }
        const data = await response.json();
        console.log(data);
        const filterdData = data.find((item) => item.id === user);
        setCharacters(filterdData.todos);
        setMainObj(filterdData);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchData();
  }, [user, setCharacters, setMainObj, characters]);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    let items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const mainData = { ...mainObj, todos: items };

    setMainObj(mainData);
    setCharacters(items);
    fetch(`http://localhost:8080/users/${user}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mainData),
    });
  }

  const handleChangeStatus = (e, id) => {
    try {
      const data = characters.map((item) => {
        if (item.id === id) {
          return { ...item, status: e.target.checked };
        }
        return item;
      });
      setCharacters(data);
      const mainData = { ...mainObj, todos: data };

      setMainObj(mainData);

      fetch(`http://localhost:8080/users/${user}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mainData),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("login");
    setLogin(false);
    navigate("/");
  };

  if (!login) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <div className="add-task">
        <AddTodo
          user={user}
          mainObj={mainObj}
          setMainObj={setMainObj}
          setCharacters={setCharacters}
          characters={characters}
          setFilter={setFilter}
          setFilterdData={setFilterdData}
        />

        <h2 onClick={handleLogout}>
          <AiOutlineLogout
            style={{ color: "red", cursor: "pointer" }}
            id="add"
          />
          {/* <span className="tooltiptext">Logout</span> */}
        </h2>
      </div>
      <div className="filter">
        <select
          name="select"
          id="select"
          value={filter}
          onChange={handleFilter}
        >
          <option value="all">All</option>
          <option value="uncompleted">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="tableformate">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul
                className="characters characters2"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {filterdData.map(
                  ({ id, title, description, status, AddedDate }, index) => {
                    return (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided) => (
                          <>
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="task"
                            >
                              <div className="delete-icon">
                                <div>
                                  <p style={{ fontWeight: "600" }}>
                                    {`${new Date(AddedDate).getDate()}/${
                                      new Date(AddedDate).getMonth() + 1
                                    }/${new Date(AddedDate).getFullYear()}`}
                                  </p>
                                </div>
                                <div style={{ display: "flex", gap: "10px" }}>
                                  <UpdateModle
                                    id={user}
                                    todoId={id}
                                    mainObj={mainObj}
                                    characters={characters}
                                    setMainObj={setMainObj}
                                    setCharacters={setCharacters}
                                  />
                                  <DeletePopUp
                                    id={user}
                                    todoId={id}
                                    mainObj={mainObj}
                                    setMainObj={setMainObj}
                                    characters={characters}
                                    setCharacters={setCharacters}
                                    setFilterdData={setFilterdData}
                                  />
                                </div>
                              </div>
                              <div>
                                <p
                                  style={{
                                    fontWeight: "bold",
                                    color: status === false ? "red" : "green",
                                  }}
                                >
                                  <Switch
                                    id="email-alerts"
                                    mr={2}
                                    onChange={(e) => handleChangeStatus(e, id)}
                                    isChecked={status}
                                  />
                                  {status === false ? "Pending" : "Completed"}
                                </p>
                              </div>
                              <div>
                                <h2
                                  style={{
                                    fontWeight: "700",
                                    textAlign: "left",
                                    fontSize: "1.5em",
                                    cursor: "pointer",
                                    zIndex: "10",
                                  }}
                                  className={`text-pending`}
                                >
                                  {title}
                                </h2>
                              </div>
                              <div className="description">
                                <p
                                  style={{
                                    fontWeight: "400",
                                    textAlign: "left",
                                    fontSize: "1em",
                                  }}
                                >
                                  {description}
                                </p>
                              </div>
                            </div>
                          </>
                        )}
                      </Draggable>
                    );
                  }
                )}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default HomePage;
