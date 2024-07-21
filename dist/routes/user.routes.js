"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user-controller");
const userRoutes = express_1.default.Router();
userRoutes.route("/create").post(user_controller_1.createUser);
userRoutes.route("/login").post(user_controller_1.loginUser);
exports.default = userRoutes;
