import React from "react";

import { Tasks } from "./features/tasks/Tasks";
import { Filters } from "./features/filters/Filters";

function App() {
  return (
    <div className="App">
      <h1>Redux Toolkit App</h1>
      <Filters />
      <Tasks />
    </div>
  );
}

export default App;
