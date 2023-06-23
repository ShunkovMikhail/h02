"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const express_basic_auth_1 = __importDefault(require("express-basic-auth"));
const data_1 = require("./data");
const data_2 = require("./data");
const blogsRouter_1 = require("./routes/blogsRouter");
const postsRouter_1 = require("./routes/postsRouter");
exports.app = (0, express_1.default)();
const db = new data_2.DB();
exports.app.use(express_1.default.json());
exports.app.get('/', (req, res) => {
    res.sendStatus(204);
});
exports.app.delete('/testing/all-data', (0, express_basic_auth_1.default)({ users: data_1.admins }), (req, res) => {
    res.sendStatus(db.clear());
});
exports.app.use('/blogs', blogsRouter_1.blogsRouter);
exports.app.use('/posts', postsRouter_1.postsRouter);
