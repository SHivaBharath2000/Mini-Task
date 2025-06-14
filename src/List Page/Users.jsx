import React, { useState, useEffect, useContext } from "react";
import "./user.css";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllUsers,
  getUsersError,
  getUsersStatus,
  fetchUsers,
  deleteUser,
  updatedUser,
  total_pages,
} from "../Redux/App/Slice/Slice";
import { globalContext } from "../App";
import { useNavigate } from "react-router-dom";
import CardView from "./CardView";

const UsersTable = () => {
  const [searchText, setSearchText] = useState("");
  const [pageButtons, setPageButtons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { update, setUpdate, users, setUsers, view, setView } =
    useContext(globalContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allUsers = useSelector(getAllUsers);
  const pages = useSelector(total_pages);
  const updateUser = useSelector(updatedUser);
  const usersStatus = useSelector(getUsersStatus);
  const usersError = useSelector(getUsersError);

  useEffect(() => {
    if (usersStatus === "idle") {
      dispatch(fetchUsers(1));
    }
  }, [usersStatus, dispatch]);

  useEffect(() => {
    const buttons = [];
    for (let i = 1; i <= pages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => {
            setCurrentPage(i);
            dispatch(fetchUsers(i));
          }}
          className={`pagination-btn ${currentPage === i ? "active" : ""}`}
        >
          {i}
        </button>
      );
    }
    setPageButtons(buttons);
  }, [pages, currentPage, dispatch]);

  useEffect(() => {
    if (allUsers.length > 0 && updateUser) {
      const mergedUsers = allUsers.map((user) =>
        user.id == updateUser.id ? { ...user, ...updateUser } : user
      );
      setUsers(mergedUsers);
    }
  }, [allUsers, updateUser, setUsers]);

  //Edit Functionality
  const handleEdit = (id) => {
    const userToEdit = users.find((e) => e.id === id);
    setUpdate(userToEdit);
    navigate(`/edit/${id}`);
  };

 // Delete Fuctionality
  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    alert("Logout Successful");
    navigate("/login");
  };

  const preAndNext = (direction) => {
    if (direction === "next" && currentPage < pages) {
      setCurrentPage((prev) => {
        const nextPage = prev + 1;
        dispatch(fetchUsers(nextPage));
        return nextPage;
      });
    }
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => {
        const prevPage = prev - 1;
        dispatch(fetchUsers(prevPage));
        return prevPage;
      });
    }
  };

  const filteredUsers = users.filter((user) =>
    [user.first_name, user.last_name, user.email].some((field) =>
      field.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <>
      <div className="user-navigate-header">
        <div className="user-navigation">
          <h2>Users</h2>
          <button onClick={logout}>
            <i
              className="fa-solid fa-right-from-bracket"
              style={{
                marginInline: "-9px",
                position: "relative",
                bottom: "2px",
              }}
            ></i>
          </button>
        </div>
      </div>

      <div className="users-container">
        <div className="users-header">
          <div className="view-toggle" style={{ marginRight: "542px" }}>
            <button
              className={view === "card" ? "active" : ""}
              onClick={() => setView("card")}
            >
              <i
                className="fa-solid fa-list"
                style={{ position: "relative", bottom: "5px", right: "8px" }}
              ></i>
            </button>
            <button
              className={view === "list" ? "active" : " "}
              onClick={() => setView("list")}
            >
              <i
                className="fa-solid fa-box"
                style={{ position: "relative", bottom: "5px", right: "8px" }}
              ></i>
            </button>
          </div>

          <div className="users-actions">
            {view === "list" && (
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            )}
            <button
              className="create-user-btn"
              onClick={() => navigate("/create-user")}
            >
              Create User
            </button>
          </div>
        </div>

        {usersStatus === "loading" && <p>Loading users...</p>}
        {usersError && <p>Error: {usersError}</p>}

        {view === "card" && <CardView edit={handleEdit} del={handleDelete}/>}

        {view === "list" && (
          <div className="users-table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Avatar</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <img
                        style={{ borderRadius: "50%" }}
                        src={user.avatar}
                        alt={user.first_name}
                      />
                    </td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.email}</td>
                    <td>
                      <button
                        className="action-btn"
                        onClick={() => handleEdit(user.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      No matching users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="pagination-container">
          <button
            className="pagination-btn"
            onClick={() => preAndNext("prev")}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {pageButtons}
          <button
            className="pagination-btn"
            onClick={() => preAndNext("next")}
            disabled={currentPage === pages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default UsersTable;
