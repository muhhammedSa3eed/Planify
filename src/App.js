import "./App.css";
import TodoList from "./components/TodoList";
import { TodoListContext } from "./contexts/TodoListContext";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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
  const theme = createTheme({
    color: {
      primary: {
        main: "#1976d2",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div style={{ direction: "rtl" }}>
        <TodoListContext.Provider
          value={{ todos: todosList, setTodos: setTodosList }}
        >
          <TodoList />
        </TodoListContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
