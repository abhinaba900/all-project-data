import React, { useEffect } from "react";
export const AuthContext = React.createContext();
function AuthContextProvider({ children }) {
  const [allUsers, setAllUsers] = React.useState({
    librarians: [],
    users: [],
    books: [],
    allRecords: [],
  });
  const [active, setActive] = React.useState("Dashboard");
  const [login, setLogin] = React.useState(
    JSON.parse(localStorage.getItem("login")) || false
  );
  const [rerander, handleRerander] = React.useState(0);
  const [stockAvalable, setStockAvalable] = React.useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const [
          booksResponse,
          usersResponse,
          librariansResponse,
          allRecordsResponse,
        ] = await Promise.all([
          fetch("http://localhost:5000/books"),
          fetch("http://localhost:5000/users"),
          fetch("http://localhost:5000/librarians"),
          fetch("http://localhost:5000/allRecords"),
        ]);

        const [booksData, usersData, librariansData, allRecordsData] =
          await Promise.all([
            booksResponse.json(),
            usersResponse.json(),
            librariansResponse.json(),
            allRecordsResponse.json(),
          ]);

        setAllUsers({
          books: booksData,
          users: usersData,
          librarians: librariansData,
          allRecords: allRecordsData,
        });

        // Map the available stock of each book to an array
        const stockAvailableArray = booksData.map((book) => 0);
        setStockAvalable(stockAvailableArray);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [handleRerander, rerander]);

  return (
    <AuthContext.Provider
      value={{
        allUsers,
        setAllUsers,
        active,
        setActive,
        login,
        setLogin,
        handleRerander,
        stockAvalable,
        setStockAvalable,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
