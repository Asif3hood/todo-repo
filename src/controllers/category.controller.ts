import { Request, Response } from 'express';
import Category from "../models/category-model";
import { ICategory } from '../types';
import { AuthRequest } from '../middlewere';
import mongoose from 'mongoose';
export const getAllCategories = async (
    request:AuthRequest,
    response:Response
) => {
    try{
        const { user } = request;
        const categoris = await Category.find({
            user: user,
        })
        return response.send(categoris);
    }catch (error){
        console.log('error in getAllCategories',error);
        throw (error) 
    }
}

export const getCategoryById = async (
    request: AuthRequest,
    response: Response
  ) => {
    try {
      const { user } = request
      const { id } = request.params
      const category = await Category.findOne({
        _id: id,
      })
      return response.send(category)
    } catch (error) {
      response.send({ error: "Something went wrong" })
      console.log("error in getAllCategories", error)
      throw error
    }
  }
  


export const createCategory = async (request:AuthRequest,response:Response
) => {
    try{
        const {color, icon, isEditable, name }: ICategory = request.body;
        const { user } =request;

        const category = await Category.create({
            color,
            icon,
            isEditable,
            name,
            user,
        })
        return response.send(category);
    }catch (error){
        console.log('error in createCategory',error);
        response.send({error: "Something went wrong"});
        throw (error) 
    }
}



export const deleteCategory = async (request:AuthRequest, response:Response) => {
    
    try {
        const { categoryId } = request.params;

        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return response.status(400).send({ error: "Invalid category ID" });
        }

        const deletedCategory = await Category.findByIdAndDelete(categoryId);

        if (!deletedCategory) {
            return response.status(404).send({ error: "Category not found" });
        }

        return response.send({ message: "Category deleted successfully" });
    } catch (error) {
        console.log('Error in deleteCategory', error);
        response.status(500).send({ error: "Something went wrong" });
    }
};


export const updateCategoty = async (
    request:AuthRequest,
    response:Response
) => {
    try {
        const { _id, color, icon, isEditable, name }: ICategory = request.body;
        await Category.updateOne(
            {
                _id,
            },
            {
                $set: {
                    name,
                    color,
                    icon,
                    isEditable,
                },
            } 
        )
        return response.send({ message: "Category updated successfully" });

    } catch (error) {
        console.log('error in updateCotegory',error);
        response.send({error:"Error in updating the categoty"});
        throw (error)
    }
}
