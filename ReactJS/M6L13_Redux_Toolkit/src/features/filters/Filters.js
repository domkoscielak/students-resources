import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setStatusFilter, selectFilters } from "./FiltersSlice";

export function Filters() {
  const filtersObject = useSelector(selectFilters);

  const filter = filtersObject.status;

  const dispatch = useDispatch();

  return (
    <div>
      <h3>Filters</h3>
      <div>
        <button
          className={filter === "all" ? "selected" : ""}
          onClick={() => dispatch(setStatusFilter("all"))}>
          All
        </button>
        <button
          className={filter === "active" ? "selected" : ""}
          onClick={() => dispatch(setStatusFilter("active"))}>
          Active
        </button>
        <button
          className={filter === "completed" ? "selected" : ""}
          onClick={() => dispatch(setStatusFilter("completed"))}>
          Completed
        </button>
      </div>
      <hr />
    </div>
  );
}
