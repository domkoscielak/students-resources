import { StatusFilter } from "./components/StatusFilter/StatusFilter";
import { TaskList } from "./components/TaskList/TaskList";
import { TaskForm } from "./components/TaskForm/TaskForm";

function App() {
  return (
    <div className="App">
      <h1>Redux App</h1>
      <TaskForm />
      <StatusFilter />
      <TaskList />
    </div>
  );
}

export default App;
