import React from "react";

const UsersList = (props) => {
  return (
    <div>
      <h2>Previous Pizzas</h2>
      <ul>
        {props.users.map((user) => {
          return <div className="user">{user.size}</div>;
        })}
      </ul>
    </div>
  );
};

export default UsersList;
