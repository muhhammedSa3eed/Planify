import "./App.css";
import TodoList from "./components/TodoList";
import { TodoListContext } from "./contexts/TodoListContext";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

// & Static Data
const todos = [
  {
    id: uuidv4(),
    text: "اهلا و سهلا",
    description: "",
    iscompleted: false,
  },
  {
    id: uuidv4(),
    text: "مرحبا بكم",
    description: "هذا وصف المهمة",
    iscompleted: false,
  },
  {
    id: uuidv4(),
    text: "كيف الحال",
    description: "",
    iscompleted: false,
  },
];
function App() {
  const [todosList, setTodosList] = useState(todos);

  return (
    <container
      maxWidth="lg"
      className="flex items-center justify-center min-h-screen "
      style={{ direction: "rtl" }}
    >
      <TodoListContext.Provider
        value={{ todos: todosList, setTodos: setTodosList }}
      >
        <TodoList />
      </TodoListContext.Provider>
    </container>
  );
}

export default App;
