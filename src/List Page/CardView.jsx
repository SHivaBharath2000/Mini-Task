import React, { useState, useContext } from "react";
import { globalContext } from "../App";
import "./CardView.css";

function CardView({ edit, del }) {
  const { users } = useContext(globalContext);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="card-container">
      {users.map((user, i) => (
        <div
          key={i}
          className={hoveredIndex === i ? "card2" : "card"}
          onMouseEnter={() => {
            setHoveredIndex(i);
          }}
          onMouseLeave={() => {
            setHoveredIndex(null);
          }}
        >
          <div>
            <img
              style={{ borderRadius: "72px" }}
              src={user.avatar}
              alt={user.name}
            />
          </div>
          <div className="name">{user.name}</div>
          <div className={hoveredIndex === i ? "email2" : "email"}>
            {user.email}
          </div>

          {hoveredIndex === i && (
            <div>
              <button
                style={{ marginRight: "10px", backgroundColor: "blue", color: "white" }}
                onClick={() => edit(user.id)}
              >
                Edit
              </button>
              <button
                style={{ backgroundColor: "red", color: "white" }}
                onClick={() => del(user.id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default CardView;
