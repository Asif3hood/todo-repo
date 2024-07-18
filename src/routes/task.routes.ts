import express from "express";
import { authenticationMiddlewere } from "../middlewere";
import { createTask, deleteTask, editTask, getAllCompletedTask, getAllTaskByCategory, getAllTasks, getTaskForToday, toggleTaskStatus } from "../controllers/task.controller";

const taskRoutes = express.Router();

taskRoutes.use(authenticationMiddlewere)

taskRoutes.route("/").get(getAllTasks)
taskRoutes.route("/tasks-by-categories/:id").get(getAllTaskByCategory)
taskRoutes.route("/completed").get(getAllCompletedTask)
taskRoutes.route("/today").get(getTaskForToday)
taskRoutes.route("/create").post(createTask)
taskRoutes.route("/update/:id").put(toggleTaskStatus)
taskRoutes.route("/:id").delete(deleteTask);
taskRoutes.route("/edit/:id").put(editTask);
export default taskRoutes