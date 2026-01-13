import {
  Button,
  Divider,
  Grid,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { v4 as uuidv4 } from "uuid";
import { TodoListContext } from "../contexts/TodoListContext";

const TodoList = () => {
  const { todos, setTodos } = useContext(TodoListContext);

  const [todoTitle, setTodoTitle] = useState("");
  const [todosType, setTodosType] = useState("all");

  const handleAddTodo = () => {
    if (!todoTitle) return;
    const updatedTodos = [
      ...todos,
      { id: uuidv4(), text: todoTitle, iscompleted: false, description: "" },
    ];
    setTodos(updatedTodos);
    localStorage.setItem("TodosList", JSON.stringify(updatedTodos));
  };

  // ^^ Todos Types Variables

  const completedTodos = todos.filter((todo) => todo.iscompleted);
  const incompletedTodos = todos.filter((todo) => !todo.iscompleted);

  const handleChangeTodosType = (event) => {
    setTodosType(event.target.value);
  };
  let displayedTodos =
    todosType === "all"
      ? todos
      : todosType === "completed"
      ? completedTodos
      : incompletedTodos;

  // && side Effects

  useEffect(() => {
    const storedTodos = localStorage.getItem("TodosList");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, [setTodos]);

  return (
    <div className="text-red-400 font-bold border rounded-md  px-4 py-2 w-[550px] ">
      <header className="py-2">
        <h1 className="text-center  text-3xl pb-3">تاسكاتي</h1>
        <Divider />
      </header>
      <main>
        <section className="my-4" style={{ direction: "ltr" }}>
          <ToggleButtonGroup
            className="flex items-center justify-center  w-full "
            color="primary"
            exclusive
            aria-label="Platform"
            value={todosType}
            onChange={handleChangeTodosType}
          >
            <ToggleButton value="completed">تمت</ToggleButton>
            <ToggleButton value="incompleted">لم تتم</ToggleButton>
            <ToggleButton value="all">الكل</ToggleButton>
          </ToggleButtonGroup>
        </section>
        <section className=" max-h-[350px] overflow-y-auto">
          {displayedTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </section>
        <section>
          <Grid
            container
            spacing={2}
            alignItems="stretch"
            className="px-4 py-2 rounded-lg my-4"
          >
            <Grid size={8}>
              <TextField
                id="addTodo"
                label="اضافة تاسك"
                variant="outlined"
                className="w-full "
                value={todoTitle}
                onChange={(event) => {
                  setTodoTitle(event.target.value);
                }}
                disabled={todoTitle.length <= 0}
              />
            </Grid>
            <Grid size={4}>
              <Button
                variant="contained"
                className="text-white px-4 py-2 rounded-md w-full !bg-violet-500 h-full"
                onClick={() => {
                  handleAddTodo();
                  setTodoTitle("");
                }}
              >
                اضف تاسك
              </Button>
            </Grid>
          </Grid>
        </section>
      </main>
    </div>
  );
};

export default TodoList;
