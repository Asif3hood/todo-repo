"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewere_1 = require("../middlewere");
const task_controller_1 = require("../controllers/task.controller");
const taskRoutes = express_1.default.Router();
taskRoutes.use(middlewere_1.authenticationMiddlewere);
taskRoutes.route("/").get(task_controller_1.getAllTasks);
taskRoutes.route("/tasks-by-categories/:id").get(task_controller_1.getAllTaskByCategory);
taskRoutes.route("/completed").get(task_controller_1.getAllCompletedTask);
taskRoutes.route("/today").get(task_controller_1.getTaskForToday);
taskRoutes.route("/create").post(task_controller_1.createTask);
taskRoutes.route("/update/:id").put(task_controller_1.toggleTaskStatus);
taskRoutes.route("/:id").delete(task_controller_1.deleteTask);
taskRoutes.route("/edit/:id").put(task_controller_1.editTask);
exports.default = taskRoutes;
