import React, { Component } from "react";
import MenuItem from "./MenuItem.js";
import ExtendableMenuItem from "./ExtendableMenuItem.js";

const INITIAL_STATE = {
  filters: [],
  open: true,
  only: null,
  dropdownFilters: []
};

class Menu extends Component {
  constructor() {
    super();
    this.onFilterClick = this.onFilterClick.bind(this);
    this.controlMenu = this.controlMenu.bind(this);
    this.handleHoverIn = this.handleHoverIn.bind(this);
    this.handleHoverOut = this.handleHoverOut.bind(this);
    this.handleDocClick = this.handleDocClick.bind(this);
    this.clearDropdown = this.clearDropdown.bind(this);
    this.state = INITIAL_STATE;
    this.dropdown = "";
  }
  handleDocClick(e) {
    if (document.querySelector(".expandable").contains(e.target)) {
      return;
    }
    if (!this.dropdown.contains(e.target)) {
      return this.setState({ open: false });
    }
  }
  componentDidMount() {
    document.addEventListener("click", this.handleDocClick, false);
  }
  componentWillUnmount() {
    document.removeEventListener("click", this.handleDocClick, false);
  }
  controlMenu(e) {
    if (this.dropdown.contains(e.target)) {
      return;
    }
    if (!this.state.open) {
      this.setState({
        open: true
      });
    } else {
      this.setState({
        open: false
      });
    }
  }
  clearDropdown(dropdownFilter) {
    this.setState({
      filters: [dropdownFilter],
      dropdownFilters: [dropdownFilter]
    });
  }

  onFilterClick(filter, isDropdown = false) {
    if (filter === "*") {
      return this.setState({ filters: [], dropdownFilters: [] });
    }
    const { filters, dropdownFilters } = this.state;
    if (filters.includes(filter)) {
      filters.splice(filters.indexOf(filter), 1);
    } else {
      filters.push(filter);
    }
    if (isDropdown) {
      if (dropdownFilters.includes(filter)) {
        dropdownFilters.splice(dropdownFilters.indexOf(filter), 1);
      } else {
        dropdownFilters.push(filter);
      }
    }
    this.setState({ filters, dropdownFilters });
  }

  renderMenuItems() {
    const items = [
      { name: "All", price: null, filter: "*" },
      { name: "Small", price: "$422+", filter: "small" },
      { name: "Medium", price: "$452+", filter: "medium" },
      { name: "Large", price: "$482+", filter: "large" },
      { name: "SUV", price: "$4299+", filter: "suv" },
      { name: "VAN", price: "$222+", filter: "van" }
    ];

    return items.map((i, index) => (
      <MenuItem
        name={i.name}
        price={i.price}
        filter={i.filter}
        filters={this.state.filters}
        onClick={this.onFilterClick}
        key={index}
      />
    ));
  }

  handleHoverIn(filter) {
    this.setState({
      only: filter
    });
  }
  handleHoverOut() {
    this.setState({
      only: null
    });
  }

  renderDropdownItems() {
    const items = [
      { name: "Pickup Truck", price: "$594+", filter: "truck" },
      { name: "Luxury", price: "$626+", filter: "luxury" },
      { name: "Commercial", price: "$1248+", filter: "commercial" },
      { name: "Convertible", price: "$1607+", filter: "convertible" }
    ];
    return (
      <li
        onClick={e => this.controlMenu(e)}
        className={this.state.open ? "expandable hover" : "expandable"}
      >
        <span className="more">More </span>
        <i className={this.state.open ? "up" : "down"} />
        <ul
          className={"dropdown " + (this.state.open ? "" : "hidden")}
          ref={node => (this.dropdown = node)}
        >
          {items.map((i, index) => (
            <ExtendableMenuItem
              onMouseEnter={this.handleHoverIn}
              onMouseLeave={this.handleHoverOut}
              hovered={i.filter === this.state.only}
              name={i.name}
              price={i.price}
              filter={i.filter}
              filters={this.state.filters}
              onClick={this.onFilterClick}
              key={index}
              clearDropdown={this.clearDropdown}
            />
          ))}
        </ul>
      </li>
    );
  }

  render() {
    return (
      <ul className="menu">
        {this.renderMenuItems()}
        {this.renderDropdownItems()}
      </ul>
    );
  }
}
export default Menu;
