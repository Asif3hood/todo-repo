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
exports.updateCategoty = exports.deleteCategory = exports.createCategory = exports.getCategoryById = exports.getAllCategories = void 0;
const category_model_1 = __importDefault(require("../models/category-model"));
const mongoose_1 = __importDefault(require("mongoose"));
const getAllCategories = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = request;
        const categoris = yield category_model_1.default.find({
            user: user,
        });
        return response.send(categoris);
    }
    catch (error) {
        console.log('error in getAllCategories', error);
        throw (error);
    }
});
exports.getAllCategories = getAllCategories;
const getCategoryById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = request;
        const { id } = request.params;
        const category = yield category_model_1.default.findOne({
            _id: id,
        });
        return response.send(category);
    }
    catch (error) {
        response.send({ error: "Something went wrong" });
        console.log("error in getAllCategories", error);
        throw error;
    }
});
exports.getCategoryById = getCategoryById;
const createCategory = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { color, icon, isEditable, name } = request.body;
        const { user } = request;
        const category = yield category_model_1.default.create({
            color,
            icon,
            isEditable,
            name,
            user,
        });
        return response.send(category);
    }
    catch (error) {
        console.log('error in createCategory', error);
        response.send({ error: "Something went wrong" });
        throw (error);
    }
});
exports.createCategory = createCategory;
const deleteCategory = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId } = request.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(categoryId)) {
            return response.status(400).send({ error: "Invalid category ID" });
        }
        const deletedCategory = yield category_model_1.default.findByIdAndDelete(categoryId);
        if (!deletedCategory) {
            return response.status(404).send({ error: "Category not found" });
        }
        return response.send({ message: "Category deleted successfully" });
    }
    catch (error) {
        console.log('Error in deleteCategory', error);
        response.status(500).send({ error: "Something went wrong" });
    }
});
exports.deleteCategory = deleteCategory;
const updateCategoty = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, color, icon, isEditable, name } = request.body;
        yield category_model_1.default.updateOne({
            _id,
        }, {
            $set: {
                name,
                color,
                icon,
                isEditable,
            },
        });
        return response.send({ message: "Category updated successfully" });
    }
    catch (error) {
        console.log('error in updateCotegory', error);
        response.send({ error: "Error in updating the categoty" });
        throw (error);
    }
});
exports.updateCategoty = updateCategoty;
