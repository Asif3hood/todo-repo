"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editTask = exports.deleteTask = exports.getAllCompletedTask = exports.getTaskForToday = exports.getAllTaskByCategory = exports.toggleTaskStatus = exports.createTask = exports.getAllTasks = void 0;
const task_model_1 = __importDefault(require("../models/task-model"));
const mongoose_1 = __importDefault(require("mongoose"));
const getAllTasks = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = request.user;
        const tasks = yield task_model_1.default.find({
            user: userId,
        });
        response.send(tasks);
    }
    catch (error) {
        console.log("error in getAllTasks", error);
        response.send({ error: "Error while fetchinf tasks" });
        throw error;
    }
});
exports.getAllTasks = getAllTasks;
const createTask = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = request.user;
        const { name, date, categoryId } = request.body;
        const task = yield task_model_1.default.create({
            name,
            date,
            categoryId,
            user: userId,
        });
        response.send(task);
    }
    catch (error) {
        console.log("error in create task", error);
        response.send({ error: "Error while creating task" });
        throw error;
    }
});
exports.createTask = createTask;
const toggleTaskStatus = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { isCompleted } = request.body;
        const { id } = request.params;
        const task = yield task_model_1.default.updateOne({
            _id: id,
        }, {
            isCompleted
        });
        response.send({ message: "Task status updated" });
    }
    catch (error) {
        console.log("Error in toggleTaskStatus", error);
        response.send({ error: "Error while toggling status task" });
        throw error;
    }
});
exports.toggleTaskStatus = toggleTaskStatus;
const getAllTaskByCategory = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = request.user;
        const { id } = request.params;
        const task = yield task_model_1.default.find({
            user: userId,
            categoryId: id,
        });
        response.send(task);
    }
    catch (error) {
        console.log("Error in getAllTaskByCategory", error);
        response.send({ error: "Error while fetching tasks" });
        throw error;
    }
});
exports.getAllTaskByCategory = getAllTaskByCategory;
const getTaskForToday = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = request.user;
        // Get the start of today
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);
        // Get the start of tomorrow
        const startOfTomorrow = new Date(startOfToday);
        startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);
        const task = yield task_model_1.default.find({
            user: userId,
            date: {
                $gte: startOfToday.toISOString(),
                $lt: startOfTomorrow.toISOString()
            }
        });
        response.send(task);
    }
    catch (error) {
        console.log("Error in getTaskForToday", error);
        response.send({ error: "Error while fetching tasks" });
        throw error;
    }
});
exports.getTaskForToday = getTaskForToday;
const getAllCompletedTask = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = request.user;
        const task = yield task_model_1.default.find({
            user: userId,
            isCompleted: true,
        });
        response.send(task);
    }
    catch (error) {
        console.log("error in getAllCompletedTask ", error);
        response.send({ error: "Error while fetching tasks" });
        throw error;
    }
});
exports.getAllCompletedTask = getAllCompletedTask;
const deleteTask = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.params;
        yield task_model_1.default.deleteOne({
            _id: id,
        });
        response.send({ message: "Task deleted" });
    }
    catch (error) {
        console.log("error in deleteTask", error);
        response.send({ error: "Error while deleting task" });
        throw error;
    }
});
exports.deleteTask = deleteTask;
const editTask = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.params;
        const { categoryId, date, name } = request.body;
        // Validate the task ID
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return response.status(400).send({ error: "Invalid task ID", invalidId: id });
        }
        // Find and update the task
        const task = yield task_model_1.default.findByIdAndUpdate(id, {
            $set: {
                name,
                categoryId,
                date,
            }
        }, { new: true } // Return the updated document
        );
        if (!task) {
            return response.status(404).send({ error: "Task not found" });
        }
        response.send({ message: "Task updated successfully", task });
    }
    catch (error) {
        console.log("Error in editTask", error);
        response.status(500).send({ error: "Error while editing the task" });
    }
});
exports.editTask = editTask;
