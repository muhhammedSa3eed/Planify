import { Cancel, Check, Delete, Edit } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { TodoListContext } from "../contexts/TodoListContext";
import { useContext, useState } from "react";

const TodoItem = ({ todo: { id, text, iscompleted, description } }) => {
  // & states
  const [open, setOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    title: text,
    description: description,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
  };
  // ^ others
  const { todos, setTodos } = useContext(TodoListContext);

  const handleIsCompleted = () => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, iscompleted: !todo.iscompleted };
      }
      return todo;
    });
    setTodos(updatedTodos);
    localStorage.setItem("TodosList", JSON.stringify(updatedTodos));
  };

  const handleDeleteTodo = () => {
    const updatedTodos = todos.filter((prev) => prev.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("TodosList", JSON.stringify(updatedTodos));
  };

  const handleEditTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            text: updatedTodo.title,
            description: updatedTodo.description,
          }
        : todo
    );
    setTodos(updatedTodos);

    handleEditClose();
    localStorage.setItem("TodosList", JSON.stringify(updatedTodos));
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ direction: "rtl" }}
      >
        <DialogTitle id="alert-dialog-title">
          هل انت متأكد من رغبتك في حذف هذا التاسك ؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لايمكنك التراجع عن الحذف في حال اختيار زر{" "}
            <span className="text-red-500">الحذف</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <Button
            onClick={handleClose}
            sx={{ backgroundColor: "#1832C9", color: "white" }}
          >
            اغلاق
          </Button>
          <Button
            onClick={handleDeleteTodo}
            autoFocus
            sx={{ backgroundColor: "#DE3818", color: "white" }}
          >
            حذف
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={isEditOpen}
        onClose={handleEditClose}
        sx={{ direction: "rtl" }}
      >
        <DialogTitle sx={{ color: "blue" }}>تعديل التاسك</DialogTitle>
        <DialogContent sx={{ width: "550px" }}>
          <TextField
            autoFocus
            required
            name="email"
            label="العنوان "
            type="text"
            fullWidth
            variant="standard"
            value={updatedTodo.title}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            label="الوصف"
            type="text"
            fullWidth
            variant="standard"
            value={updatedTodo.description}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, description: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <Button
            onClick={handleEditClose}
            sx={{ backgroundColor: "#DE3818", color: "white" }}
          >
            اغلاق
          </Button>
          <Button
            autoFocus
            sx={{ backgroundColor: "#1832C9", color: "white" }}
            onClick={() => {
              handleEditTodo(id);
            }}
          >
            تعديل
          </Button>
        </DialogActions>
      </Dialog>

      <Grid
        container
        spacing={2}
        className={`px-4 py-2 items-center justify-between rounded-lg bg-blue-300 my-4 ${
          iscompleted ? "border-2 border-emerald-500 " : ""
        }`}
      >
        <Grid size={8}>
          <h3 className="text-black">{text}</h3>
          <h4>{description}</h4>
        </Grid>
        <Grid
          size={4}
          className="flex items-center gap-2 "
          style={{ direction: "ltr" }}
        >
          <Button
            variant="outlined"
            color="error"
            className="!rounded-full !min-w-0 !p-1 "
            onClick={handleClickOpen}
          >
            {" "}
            <Delete className=" " />
          </Button>
          <Button
            variant="outlined"
            color="primary"
            className="!rounded-full !min-w-0 !p-1 "
            onClick={() => {
              setIsEditOpen(true);
            }}
          >
            <Edit />
          </Button>
          <Button
            variant="outlined"
            color={`${iscompleted === true ? "error" : "success"}`}
            className="!rounded-full !min-w-0 !p-1 "
            onClick={() => {
              handleIsCompleted();
            }}
          >
            {iscompleted === true ? <Cancel /> : <Check />}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default TodoItem;
