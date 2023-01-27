import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTask,
  deleteTask,
  toggleCompleted,
  selectTasks,
} from "./TasksSlice";
import { selectFilters } from "../filters/FiltersSlice";

export function Tasks() {
  const tasks = useSelector(selectTasks);
  const filters = useSelector(selectFilters);
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    const taskText = inputRef.current.value;
    dispatch(
      addTask({
        id: tasks.length,
        text: taskText,
        completed: false,
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

  console.log("statusFilter", statusFilter);

  const visibleTasks = getVisibleTasks(tasks, statusFilter);

  return (
    <div>
      <h1>Tasks Manager</h1>
      <input type="text" ref={inputRef} />
      <button onClick={handleAddTask}>ADD TASK</button>
      <ul>
        {visibleTasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => dispatch(toggleCompleted(task.id))}
            />
            {task.text}
            <button onClick={() => dispatch(deleteTask(task.id))}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
