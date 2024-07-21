"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const task_routes_1 = __importDefault(require("./routes/task.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = 4000;
(0, db_1.default)();
// Root URL route handler
app.get("/", (request, response) => {
    response.send("Welcome to the Home Page!");
});
app.get("/ping", (request, response) => {
    response.send("pong");
});
app.use("/users", user_routes_1.default);
app.use("/categories", category_routes_1.default);
app.use("/tasks", task_routes_1.default);
// Error handling middleware for 404 Not Found
app.use((request, response) => {
    response.status(404).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <title>Error</title>
        </head>
        <body>
            <pre>Cannot GET ${request.url}</pre>
        </body>
        </html>
    `);
});
app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
});
