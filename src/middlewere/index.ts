import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from 'express';
import User from "../models/user-model";

export interface AuthRequest extends Request {
    user?: string;
}

export const authenticationMiddlewere = async (
    request: AuthRequest,
    response: Response,
    next: NextFunction
) => {
    try {
        const { authorization } = request.headers;
        if (!authorization) {
            return response.status(401).json({
                error: "Authorization is required",
            });
        }

        

        const { _id } = jwt.verify(authorization, "express") as { _id: string }; // Type assertion
        const existingUser = await User.findOne({ _id });

        if (existingUser) {
            request.user = existingUser.id;
        } else {
            return response.status(401).json({
                error: "User not found",
            });
        }

        next();

    } catch (error) {
        console.log('error in authenticationMiddlewere', error);
        return response.status(401).json({
            error: "Invalid token",
        });
    }
};
