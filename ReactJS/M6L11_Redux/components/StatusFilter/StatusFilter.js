import { useSelector, useDispatch } from "react-redux";
import { statusFilters } from "../../redux/constants";
import { Button } from "../Button/Button";

export const StatusFilter = () => {
  const filter = useSelector((state) => state.filters.status);
  const dispatch = useDispatch();

  const handleFilterChange = (filter) => {
    dispatch({ type: "filters/setStatusFilter", payload: filter });
  };

  return (
    <div>
      <Button
        selected={filter === statusFilters.all}
        onClick={() => handleFilterChange(statusFilters.all)}>
        All
      </Button>
      <Button
        selected={filter === statusFilters.active}
        onClick={() => handleFilterChange(statusFilters.active)}>
        Active
      </Button>
      <Button
        selected={filter === statusFilters.completed}
        onClick={() => handleFilterChange(statusFilters.completed)}>
        Completed
      </Button>
    </div>
  );
};
