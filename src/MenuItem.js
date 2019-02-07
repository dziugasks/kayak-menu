import React from "react";
import "./App.css";

const MenuItem = ({ onClick, filters, filter, name, price }) => {
  return (
    <li
      onClick={() => onClick(filter)}
      className={
        filters.includes(filter) || (filters.length === 0 && filter === "*")
          ? "hover"
          : null
      }
    >
      {name}
      {price ? <span> {price} </span> : null}
    </li>
  );
};

export default MenuItem;
