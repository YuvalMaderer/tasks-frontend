import api from "@/services/api.service";
import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@headlessui/react";
import { ListTodo, Pin, PinOff, Table, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TaskDeatilPage from "./TaskDeatilPage";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/providers/user.context";

function TasksPage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef(null);
  const [tasks, setTasks] = useState(null);
  const [todoItems, setTodoItems] = useState([""]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [isTableView, setIsTableView] = useState(false);
  const { loggedInUser } = useAuth();

  const fetchTasks = async () => {
    try {
      const response = await api.get("/task");
      setTasks(response.data);
    } catch (error) {
      setError("Failed to fetch tasks");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsExpanded(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openModal = (task) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setCurrentTask(null);
    navigate("/tasks");
  }, [navigate]);

  useEffect(() => {
    if (currentTask) {
      navigate(`/tasks/${currentTask._id}`);
    }
  }, [currentTask]);

  const handleAddTodo = () => setTodoItems([...todoItems, ""]);

  const handleRemoveTodo = useCallback((index) => {
    setTodoItems((prevItems) => prevItems.filter((_, i) => i !== index));
  }, []);

  const handleTodoChange = useCallback((index, value) => {
    setTodoItems((prevItems) => {
      const newTodoItems = [...prevItems];
      newTodoItems[index] = value;
      return newTodoItems;
    });
  }, []);

  const handleDelete = async (e, taskId) => {
    e.stopPropagation();
    try {
      await api.delete(`/task/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleComplete = async (todoId) => {
    const updatedTodoList = currentTask.todoList.map((todo) =>
      todo._id === todoId ? { ...todo, isComplete: !todo.isComplete } : todo
    );

    setCurrentTask((prevTask) => ({ ...prevTask, todoList: updatedTodoList }));

    try {
      await api.patch(`/task/${currentTask._id}`, {
        todoList: updatedTodoList,
      });
    } catch (error) {
      console.error("Error updating todo completion status:", error);
    }
  };

  const handlePinned = async (e, taskId) => {
    e.stopPropagation();
    const task = tasks.find((task) => task._id === taskId);

    if (!task) {
      console.error("Task not found");
      return;
    }

    const updatedTask = { ...task, isPinned: !task.isPinned };

    setCurrentTask(updatedTask);
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t._id === taskId ? updatedTask : t))
    );

    try {
      await api.patch(`/task/${taskId}`, { isPinned: updatedTask.isPinned });
    } catch (error) {
      console.error("Error updating task pinned status:", error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      body,
      todoList: todoItems.map((item) => ({ title: item, isComplete: false })),
    };

    try {
      const response = await api.post("/task", newTask);
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setTitle("");
      setDescription("");
      setBody("");
      setTodoItems([""]);
      setIsExpanded(false);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <>
      <h1 className="my-4 text-2xl flex justify-center text-center">
        My Tasks
      </h1>
      <div
        ref={containerRef}
        className="relative flex justify-center gap-4 items-center"
      >
        <form onSubmit={handleCreate}>
          <Input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={isExpanded ? "Enter Title here" : "Add New Task..."}
            className={`p-2 border rounded-lg transition-all duration-300 ease-in-out w-96 mb-4 mt-4 ${
              isExpanded ? "h-16" : "h-10"
            }`}
            onFocus={() => setIsExpanded(true)}
            onBlur={() =>
              setTimeout(() => {
                if (!document.activeElement.closest(".additional-fields")) {
                  setIsExpanded(false);
                }
              }, 100)
            }
          />
          {isExpanded && (
            <div className="absolute top-full left-[33%] mt-2 w-96 p-4 border border-gray-300 bg-white rounded-lg shadow-lg additional-fields">
              <div className="mb-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description:
                </label>
                <Input
                  required
                  id="description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 p-2 border rounded-lg w-full"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="body"
                  className="block text-sm font-medium text-gray-700"
                >
                  Body:
                </label>
                <Input
                  required
                  id="body"
                  type="text"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="mt-1 p-2 border rounded-lg w-full"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="todoList"
                  className="block text-sm font-medium text-gray-700"
                >
                  Todo List:
                </label>
                {todoItems.map((item, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <Input
                      type="text"
                      value={item}
                      onChange={(e) => handleTodoChange(index, e.target.value)}
                      className="mt-1 p-2 border rounded-lg w-full"
                    />
                    <Button
                      type="button"
                      className={`ml-2 p-2 text-white rounded-lg ${
                        index === todoItems.length - 1
                          ? "bg-blue-500"
                          : "bg-red-500"
                      }`}
                      onClick={() =>
                        index === todoItems.length - 1
                          ? handleAddTodo()
                          : handleRemoveTodo(index)
                      }
                    >
                      {index === todoItems.length - 1 ? "+" : "-"}
                    </Button>
                  </div>
                ))}
                <Button
                  type="submit"
                  className="mt-2 p-2 text-white rounded-lg bg-blue-500"
                >
                  Create
                </Button>
              </div>
            </div>
          )}
        </form>
        <Button
          onClick={() => setIsTableView(!isTableView)}
          className="p-2 text-white bg-blue-500 rounded-lg"
        >
          {isTableView ? <ListTodo /> : <Table />}
        </Button>
      </div>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white p-5">
              <div className="flex justify-between">
                <Skeleton className="h-[35px] w-[500px] rounded" />
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
              <div>
                <Skeleton className="h-[20px] w-[300px] rounded" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-[20px] w-[500px] rounded mt-6" />
                <Skeleton className="h-10 w-10 rounded-full mt-2" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          {isTableView ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Body
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tasks
                    ?.slice()
                    .sort((a, b) => b.isPinned - a.isPinned) // Sort tasks with pinned tasks first
                    .map((task) => (
                      <tr key={task._id} onClick={() => openModal(task)}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {task.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {task.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {task.body}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePinned(e, task._id);
                            }}
                            className="mr-2"
                          >
                            {task.isPinned ? <PinOff /> : <Pin />}
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                              >
                                <Trash2 />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete your task and remove your
                                  data from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={(e) => handleDelete(e, task._id)}
                                >
                                  Continue
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tasks?.map((task) => (
                <Card
                  key={task._id}
                  className={`w-full h-[150px] ${
                    task.isPinned ? "order-first" : ""
                  }`}
                  onClick={() => {
                    openModal(task);
                  }}
                >
                  <CardHeader>
                    <div className="flex justify-between">
                      <CardTitle>{task.title}</CardTitle>
                      <Button
                        onClick={(e) => {
                          setCurrentTask(task);
                          handlePinned(e, task._id);
                        }}
                      >
                        {task.isPinned ? <PinOff /> : <Pin />}
                      </Button>
                    </div>
                    <CardDescription>{task.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-between">
                    <p>{task.body}</p>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <Trash2 />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your task and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel
                            onClick={(e) => e.stopPropagation()}
                          >
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={(e) => handleDelete(e, task._id)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </>
      )}

      <TaskDeatilPage isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-xl font-semibold">{currentTask?.title}</h2>
        <p className="mt-4">{currentTask?.description}</p>
        <p className="mt-4">{currentTask?.body}</p>
        <h2 className="mt-4">Todo List:</h2>
        {currentTask?.todoList.map((todo, index) => (
          <div key={index} className="flex items-center space-x-3 my-3">
            <Checkbox
              id={`todo-${index}`}
              checked={todo.isComplete}
              onClick={() => handleComplete(todo._id)}
            />
            <label
              htmlFor={`todo-${index}`}
              className="text-sm font-medium leading-none"
            >
              {todo.title}
            </label>
          </div>
        ))}
      </TaskDeatilPage>
    </>
  );
}

export default TasksPage;
