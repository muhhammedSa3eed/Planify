import {
  Button,
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
  const [todoDescription, setTodoDescription] = useState("");
  const [todosType, setTodosType] = useState("all");

  const handleAddTodo = () => {
    if (!todoTitle) return;
    const updatedTodos = [
      ...todos,
      {
        id: uuidv4(),
        text: todoTitle,
        iscompleted: false,
        description: todoDescription,
      },
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              تاسكاتي
            </h1>
            <p className="text-cyan-200/80 font-medium">مدير المهام الذكي</p>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Input Section */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-6 sticky top-24 border border-white/20 hover:border-white/30 transition-all">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-6">
                إضافة مهمة جديدة
              </h2>

              <div className="space-y-4">
                <TextField
                  id="addTodo"
                  placeholder="اكتب عنوان المهمة..."
                  variant="outlined"
                  fullWidth
                  value={todoTitle}
                  onChange={(event) => {
                    setTodoTitle(event.target.value);
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      backgroundColor: "rgba(255,255,255,0.05)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "white",
                      transition: "all 0.3s ease",
                      "& fieldset": {
                        borderColor: "rgba(255,255,255,0.2)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(34, 211, 238, 0.5)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "rgba(34, 211, 238, 0.8)",
                        borderWidth: "2px",
                      },
                    },
                    "& .MuiOutlinedInput-input": {
                      textAlign: "right",
                      fontSize: "0.95rem",
                      color: "white",
                      "&::placeholder": {
                        color: "rgba(255,255,255,0.5)",
                        opacity: 1,
                      },
                    },
                  }}
                />

                <TextField
                  id="addDescription"
                  placeholder="اكتب وصف المهمة (اختياري)..."
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={3}
                  value={todoDescription}
                  onChange={(event) => {
                    setTodoDescription(event.target.value);
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      backgroundColor: "rgba(255,255,255,0.05)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "white",
                      transition: "all 0.3s ease",
                      "& fieldset": {
                        borderColor: "rgba(255,255,255,0.2)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(34, 211, 238, 0.5)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "rgba(34, 211, 238, 0.8)",
                        borderWidth: "2px",
                      },
                    },
                    "& .MuiOutlinedInput-input": {
                      textAlign: "right",
                      fontSize: "0.95rem",
                      color: "white",
                      "&::placeholder": {
                        color: "rgba(255,255,255,0.5)",
                        opacity: 1,
                      },
                    },
                  }}
                />

                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    handleAddTodo();
                    setTodoTitle("");
                    setTodoDescription("");
                  }}
                  disabled={todoTitle.length <= 0}
                  sx={{
                    background:
                      "linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%)",
                    color: "white",
                    borderRadius: "10px",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    textTransform: "none",
                    padding: "12px",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    "&:hover:not(:disabled)": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 20px 40px rgba(6, 182, 212, 0.4)",
                    },
                    "&:disabled": {
                      background: "rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.4)",
                      cursor: "not-allowed",
                    },
                  }}
                >
                  ➕ إضافة المهمة
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <h3 className="text-sm font-bold text-cyan-300 mb-4 uppercase tracking-widest">
                  الإحصائيات
                </h3>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-cyan-500/20 to-cyan-600/10 rounded-lg p-4 border border-cyan-400/30 hover:border-cyan-400/60 transition-all">
                    <span className="text-xs text-cyan-200/80 block mb-1">
                      إجمالي المهام
                    </span>
                    <span className="text-3xl font-black text-cyan-300">
                      {todos.length}
                    </span>
                  </div>
                  <div className="bg-gradient-to-r from-green-500/20 to-green-600/10 rounded-lg p-4 border border-green-400/30 hover:border-green-400/60 transition-all">
                    <span className="text-xs text-green-200/80 block mb-1">
                      مكتملة
                    </span>
                    <span className="text-3xl font-black text-green-300">
                      {completedTodos.length}
                    </span>
                  </div>
                  <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/10 rounded-lg p-4 border border-orange-400/30 hover:border-orange-400/60 transition-all">
                    <span className="text-xs text-orange-200/80 block mb-1">
                      قيد الانتظار
                    </span>
                    <span className="text-3xl font-black text-orange-300">
                      {incompletedTodos.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Todos List */}
          <div className="lg:col-span-2">
            {/* Filter Section */}
            <div className="mb-8">
              <div className="flex gap-3 justify-center sm:justify-start flex-wrap">
                <ToggleButtonGroup
                  color="primary"
                  exclusive
                  aria-label="Platform"
                  value={todosType}
                  onChange={handleChangeTodosType}
                  sx={{
                    gap: "8px",
                    "& .MuiToggleButton-root": {
                      textTransform: "none",
                      fontSize: "0.95rem",
                      fontWeight: "700",
                      padding: "12px 20px",
                      border: "2px solid rgba(255,255,255,0.2)",
                      color: "rgba(255,255,255,0.6)",
                      backgroundColor: "transparent",
                      borderRadius: "10px",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&.Mui-selected": {
                        backgroundColor: "rgba(6, 182, 212, 0.9)",
                        color: "white",
                        borderColor: "rgba(34, 211, 238, 0.8)",
                        boxShadow: "0 0 20px rgba(6, 182, 212, 0.5)",
                      },
                      "&:hover": {
                        borderColor: "rgba(34, 211, 238, 0.6)",
                        backgroundColor: "rgba(34, 211, 238, 0.1)",
                      },
                    },
                  }}
                >
                  <ToggleButton value="all">📋 الكل</ToggleButton>
                  <ToggleButton value="incompleted">
                    ⏳ قيد الانتظار
                  </ToggleButton>
                  <ToggleButton value="completed">✅ مكتملة</ToggleButton>
                </ToggleButtonGroup>
              </div>
            </div>

            {/* Todos Grid */}
            <div className="space-y-4">
              {displayedTodos.length > 0 ? (
                <div className="grid gap-4">
                  {displayedTodos.map((todo) => (
                    <div
                      key={todo.id}
                      className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 hover:border-white/40 hover:bg-white/15 transition-all hover:shadow-lg hover:shadow-cyan-500/20"
                    >
                      <TodoItem todo={todo} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl border-2 border-dashed border-white/20 p-12 text-center hover:border-white/30 transition-all">
                  <div className="mb-4">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-400/30">
                      <span className="text-5xl">📝</span>
                    </div>
                  </div>
                  <p className="text-white/80 text-lg font-bold mb-2">
                    لا توجد مهام
                  </p>
                  <p className="text-white/50 text-sm">
                    {todosType === "completed" &&
                      "لم تكمل أي مهام بعد - استمر في العمل! 💪"}
                    {todosType === "incompleted" &&
                      "عظيم! أكملت جميع مهامك - خذ استراحة 🎉"}
                    {todosType === "all" &&
                      "ابدأ بإضافة مهمة جديدة من الجانب الأيسر 🚀"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
