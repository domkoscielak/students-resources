import { useDispatch } from "react-redux";
import { deleteTask, toggleCompleted } from "../../redux/actions";

export const Task = ({ task }) => {
  const dispatch = useDispatch();

  const handleDeleteTask = () => {
    dispatch(deleteTask(task.id));
  };

  const handleToggleCompleted = () => {
    dispatch(toggleCompleted(task.id));
  };

  return (
    <>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggleCompleted}
      />
      <p>{task.text}</p>
      <button onClick={handleDeleteTask}>X Close</button>
    </>
  );
};
