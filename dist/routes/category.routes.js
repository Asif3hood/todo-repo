"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("../controllers/category.controller");
const middlewere_1 = require("../middlewere");
const categoryRoutes = express_1.default.Router();
categoryRoutes.use(middlewere_1.authenticationMiddlewere);
categoryRoutes.route("/").get(category_controller_1.getAllCategories);
categoryRoutes.route("/:id").get(category_controller_1.getCategoryById);
categoryRoutes.route("/create").post(category_controller_1.createCategory);
categoryRoutes.route("/:categoryId").delete(category_controller_1.deleteCategory);
categoryRoutes.route("/:update").put(category_controller_1.updateCategoty);
exports.default = categoryRoutes;
