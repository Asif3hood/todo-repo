import express, { Request, Response, NextFunction } from "express";
import connectToDatabase from "./db";
import userRoutes from "./routes/user.routes";
import categoryRoutes from "./routes/category.routes";
import taskRoutes from "./routes/task.routes";

const app = express();

app.use(express.json());

const PORT = 1337;

connectToDatabase();

// Root URL route handler
app.get("/", (request: Request, response: Response) => {
    response.send("Welcome to the Home Page!");
});

app.get("/ping", (request: Request, response: Response) => {
    response.send("pong");
});

app.use("/users",userRoutes);
app.use("/categories",categoryRoutes);
app.use("/tasks",taskRoutes);


// Error handling middleware for 404 Not Found
app.use((request:Request, response:Response) => {
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
