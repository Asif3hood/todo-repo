import express from "express";
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategoty } from "../controllers/category.controller";
import { authenticationMiddlewere } from "../middlewere";

const categoryRoutes = express.Router();

categoryRoutes.use(authenticationMiddlewere);

categoryRoutes.route("/").get(getAllCategories);
categoryRoutes.route("/:id").get(getCategoryById)
categoryRoutes.route("/create").post(createCategory);
categoryRoutes.route("/:categoryId").delete(deleteCategory);
categoryRoutes.route("/:update").put(updateCategoty);

export default categoryRoutes;
