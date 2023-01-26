import { statusFilters } from "./constants";

// oddzielny stan dla tasków i dla filtrów
const tasksInitialState = [];
const filtersInitialState = {
  status: statusFilters.all,
};

// reducer dla tasków
const tasksReducer = (state = tasksInitialState, action) => {
  switch (action.type) {
    case "tasks/addTask":
      return [...state, action.payload];
    case "tasks/deleteTask":
      return state.filter((task) => task.id !== action.payload);
    case "tasks/toggleCompleted":
      return state.map((task) => {
        if (task.id !== action.payload) {
          return task;
        }
        return { ...task, completed: !task.completed };
      });
    default:
      return state;
  }
};

// reducer dla filtrów
const filtersReducer = (state = filtersInitialState, action) => {
  switch (action.type) {
    case "filters/setStatusFilter":
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

// główny reducer
export const rootReducer = (state = {}, action) => {
  return {
    tasks: tasksReducer(state.tasks, action),
    filters: filtersReducer(state.filters, action),
  };
};
