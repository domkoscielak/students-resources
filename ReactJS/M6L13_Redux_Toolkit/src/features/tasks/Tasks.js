import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTask,
  deleteTask,
  toggleCompleted,
  selectTasks,
  fetchTasks,
} from "./TasksSlice";
import { selectFilters } from "../filters/FiltersSlice";

export function Tasks() {
  const tasks = useSelector(selectTasks);
  const filters = useSelector(selectFilters);
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddTask = () => {
    const taskText = inputRef.current.value;
    dispatch(
      addTask({
        text: taskText,
      })
    );
    inputRef.current.value = "";
  };

  const getVisibleTasks = (tasks, statusFilter) => {
    switch (statusFilter) {
      case "active":
        return tasks.filter((task) => !task.completed);
      case "completed":
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  };

  const statusFilter = filters.status;

  const visibleTasks = getVisibleTasks(tasks.items, statusFilter);

  return (
    <div>
      <h1>Tasks Manager</h1>

      <input type="text" ref={inputRef} />
      <button onClick={handleAddTask}>ADD TASK</button>

      {tasks.isLoading && <p>Loading...</p>}
      {tasks.error && <p>{tasks.error}</p>}
      {visibleTasks.length === 0 && !tasks.isLoading && <p>No tasks to show</p>}
      {visibleTasks.length > 0 && (
        <ul>
          {visibleTasks.map((task) => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => dispatch(toggleCompleted(task))}
              />
              {task.text}[{task.id}]
              <button onClick={() => dispatch(deleteTask(task.id))}>x</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
