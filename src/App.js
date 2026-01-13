import "./App.css";
import TodoList from "./components/TodoList";
import { TodoListContext } from "./contexts/TodoListContext";
import { useState } from "react";


function App() {
  const [todosList, setTodosList] = useState([]);

  return (
    <div style={{ direction: "rtl" }}>
      <TodoListContext.Provider
        value={{ todos: todosList, setTodos: setTodosList }}
      >
        <TodoList />
      </TodoListContext.Provider>
    </div>
  );
}

export default App;
