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
exports.loginUser = exports.createUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../models/user-model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getUserToken = (_id) => {
    const authenticatedUserToken = jsonwebtoken_1.default.sign({ _id }, "express", {
        expiresIn: "7d",
    });
    return authenticatedUserToken;
};
const createUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = request.body;
        // Log the incoming data
        //console.log('Received data:', { name, email, password });
        if (!email) {
            return response.status(400).send("Email is required");
        }
        const existingUser = yield user_model_1.default.findOne({ email });
        if (existingUser) {
            return response.status(409).send("User already exists");
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
        const user = yield user_model_1.default.create({
            name,
            email,
            password: hashedPassword,
        });
        return response.status(201).send({ message: "User created successfully" });
    }
    catch (error) {
        console.log('Error in createUser:', error);
        return response.status(500).send("Internal Server Error");
    }
});
exports.createUser = createUser;
const loginUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = request.body;
        const existingUser = yield user_model_1.default.findOne({ email });
        if (!existingUser) {
            return response.status(409).send({ message: "User doesn't exist" });
        }
        const isPasswordIdentical = yield bcryptjs_1.default.compare(password, existingUser.password);
        if (isPasswordIdentical) {
            const token = getUserToken((existingUser)._id);
            return response.send({
                token,
                user: {
                    email: (existingUser).email,
                    name: existingUser.name,
                },
            });
        }
        else {
            return response.status(400).send({ message: "Wrong credentials" });
        }
    }
    catch (error) {
        console.log('ERRO IN loginUser', error);
        throw (error);
    }
});
exports.loginUser = loginUser;
