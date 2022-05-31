"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_version = process.env.API_VERSION || 'api/v1';
const metaHandler_1 = __importDefault(require("./handler/metaHandler"));
const metaMiddleware_1 = __importDefault(require("./middleware/metaMiddleware"));
const routes = [
    {
        path: `/${api_version}/meta/lookup`,
        method: 'GET',
        handler: metaHandler_1.default,
        middleware: metaMiddleware_1.default,
    },
];
exports.default = routes;
