import { request, Request, Response } from "express"
import { AuthRequest } from "../middlewere"
import Task from "../models/task-model"
import { ITask } from "../types"
import mongoose from "mongoose"

export const getAllTasks = async (request:AuthRequest, response:Response) =>{
    try{
        const userId = request.user
        const tasks = await Task.find({
            user:userId,
        })
        response.send(tasks)
    }catch(error) {
        console.log("error in getAllTasks",error)
        response.send({error: "Error while fetchinf tasks"})

        throw error
    }
}

export const createTask = async (request:AuthRequest, response:Response) =>{
    try {
        const userId = request.user
        const { name, date, categoryId }: ITask = request.body

        const task = await Task.create({
            name,
            date,
            categoryId,
            user:userId,
        })
        response.send(task)
    } catch (error) {
        console.log("error in create task",error);
        response.send({error: "Error while creating task"})
        throw error
    }
}


export const toggleTaskStatus = async (request:AuthRequest, response:Response) => {
   try {
    const { isCompleted } = request.body

    const { id } = request.params
    const task = await Task.updateOne({
        _id:id,
    },
    {
        isCompleted
    }
)
response.send({message: "Task status updated"})
   } catch (error) {
    console.log("Error in toggleTaskStatus", error);
    response.send({error: "Error while toggling status task"})
    throw error
    
   } 
}

export const getAllTaskByCategory= async (
    request:AuthRequest, response:Response) => {
    try {
        const userId = request.user
        const { id } = request.params
        const task = await Task.find({
            user: userId,
            categoryId: id,
        })
        response.send(task);
    } catch (error) {
        console.log("Error in getAllTaskByCategory",error)
        response.send({error: "Error while fetching tasks"});

        throw error
    }
}

export const getTaskForToday = async (request: AuthRequest, response: Response) => {
    try {
        const userId = request.user;

        // Get the start of today
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);

        // Get the start of tomorrow
        const startOfTomorrow = new Date(startOfToday);
        startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

        const task = await Task.find({
            user: userId,
            date: {
                $gte: startOfToday.toISOString(),
                $lt: startOfTomorrow.toISOString()
            }
        });

        response.send(task);
    } catch (error) {
        console.log("Error in getTaskForToday", error);
        response.send({ error: "Error while fetching tasks" });
        throw error;
    }
};


export const getAllCompletedTask = async (request:AuthRequest, response:Response) => {
    try {
        const userId = request.user
        const task = await Task.find({
            user: userId,
            isCompleted: true,
        })
        response.send(task);
    } catch (error) {
        console.log("error in getAllCompletedTask ",error)
        response.send({error: "Error while fetching tasks"});

        throw error
    }
}


export const deleteTask = async (request: AuthRequest, response: Response) => {
    try {
      const { id } = request.params
      await Task.deleteOne({
        _id: id,
      })
      response.send({ message: "Task deleted" })
    } catch (error) {
      console.log("error in deleteTask", error)
      response.send({ error: "Error while deleting task" })
      throw error
    }
  }
  

export const editTask = async (request: AuthRequest, response: Response) => {
    try {
        const { id } = request.params;
        const { categoryId, date, name }: ITask = request.body;

        // Validate the task ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).send({ error: "Invalid task ID", invalidId: id });
        }

        // Find and update the task
        const task = await Task.findByIdAndUpdate(
            id,
            {
                $set: {
                    name,
                    categoryId,
                    date,
                }
            },
            { new: true } // Return the updated document
        );

        if (!task) {
            return response.status(404).send({ error: "Task not found" });
        }

        response.send({ message: "Task updated successfully", task });
    } catch (error) {
        console.log("Error in editTask", error);
        response.status(500).send({ error: "Error while editing the task" });
    }
};