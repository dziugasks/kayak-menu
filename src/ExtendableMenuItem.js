import React from "react";
import "./App.css";

const ExtendableMenuItem = ({
  onClick,
  filters,
  filter,
  name,
  price,
  hovered,
  onMouseEnter,
  onMouseLeave,
  clearDropdown
}) => {
  return (
    <li onMouseEnter={() => onMouseEnter(filter)} onMouseLeave={onMouseLeave}>
      <input
        type="checkbox"
        checked={
          filters.includes(filter) || (filters.length === 0 && filter === "*")
        }
        onChange={() => onClick(filter, true)}
        id={`id_${filter}`}
      />
      <label htmlFor={`id_${filter}`}>{name}</label>
      {hovered ? (
        <span className="only" onClick={() => clearDropdown(filter)}>
          only
        </span>
      ) : null}
      {price ? <span className="price"> {price} </span> : null}
    </li>
  );
};

export default ExtendableMenuItem;
