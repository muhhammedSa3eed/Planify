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

      <div
        className={`p-5 rounded-lg transition-all duration-300 relative overflow-hidden group ${
          iscompleted
            ? "bg-gradient-to-r from-emerald-500/30 via-teal-500/20 to-cyan-600/10 border-emerald-400/60 shadow-lg shadow-emerald-500/20"
            : "bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border-cyan-400/30"
        } border hover:border-white/40 hover:bg-opacity-50`}
      >
        {/* Completed Badge */}
        {iscompleted && (
          <div className="absolute top-3 right-3 flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-1 rounded-full">
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-xs font-bold text-white">مكتملة</span>
          </div>
        )}

        <div className="flex items-start justify-between gap-4">
          {/* Left Content */}
          <div className="flex-1 min-w-0">
            <h3
              className={`text-lg font-bold mb-2 transition-all ${
                iscompleted
                  ? "text-emerald-200 line-through bg-gradient-to-r from-emerald-400/40 to-teal-400/40 px-2 py-1 rounded"
                  : "text-white/90"
              }`}
            >
              {text}
            </h3>
            {description && (
              <p
                className={`text-sm transition-all leading-relaxed ${
                  iscompleted ? "text-emerald-200/50" : "text-white/60"
                }`}
              >
                {description}
              </p>
            )}
          </div>

          {/* Right Actions */}
          <div
            className="flex items-center gap-2 flex-shrink-0"
            style={{ direction: "ltr" }}
          >
            <Button
              size="small"
              onClick={() => {
                handleIsCompleted();
              }}
              sx={{
                minWidth: "44px",
                height: "44px",
                borderRadius: "50%",
                background: iscompleted
                  ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                  : "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                color: "white",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                border: "2px solid rgba(255,255,255,0.3)",
                "&:hover": {
                  transform: "scale(1.15) translateY(-3px)",
                  boxShadow: iscompleted
                    ? "0 12px 30px rgba(16, 185, 129, 0.5)"
                    : "0 12px 30px rgba(239, 68, 68, 0.5)",
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {iscompleted ? (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <Cancel sx={{ fontSize: "22px" }} />
              )}
            </Button>

            <Button
              size="small"
              onClick={() => {
                setIsEditOpen(true);
              }}
              sx={{
                minWidth: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                color: "white",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                border: "1px solid rgba(255,255,255,0.2)",
                "&:hover": {
                  transform: "scale(1.15) translateY(-2px)",
                  boxShadow: "0 8px 20px rgba(59, 130, 243, 0.4)",
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Edit sx={{ fontSize: "22px" }} />
            </Button>

            <Button
              size="small"
              onClick={handleClickOpen}
              sx={{
                minWidth: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)",
                color: "white",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                border: "1px solid rgba(255,255,255,0.2)",
                "&:hover": {
                  transform: "scale(1.15) translateY(-2px)",
                  boxShadow: "0 8px 20px rgba(244, 63, 94, 0.4)",
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Delete sx={{ fontSize: "22px" }} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoItem;
