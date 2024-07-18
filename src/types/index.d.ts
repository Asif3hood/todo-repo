import { Interface } from "readline";

export interface IUser {
    email: string;
    password: string;
    name: string;
}

export interface IColor {
    name: string;
    id: string;
    code: string;
}

export interface IIcon {
    name: string;
    id: string;
    symbol: string;
}

export interface ICategory {
    _id: string,
    name: string;
    user: IUser | string; // `string` for ObjectId
    isEditable: boolean;
    color: IColor;
    icon: IIcon;
}
 
export interface ITask {
    _id: string,
    name: string;
    categoryId: string,
    user: string,
    isCompleted: boolean,
    isEditable: boolean,
    date: string,
    createdAt: string,
    updatedAt: string
}