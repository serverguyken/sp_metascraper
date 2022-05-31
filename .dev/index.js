"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const port = process.env.PORT || 3002;
const cors = require('cors');
const whitelist = ['https://spacre.com', 'http://10.0.0.138:3000', 'http://localhost:3000', 'https://spacre-userapi.herokuapp.com'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('No permission to call this API'));
        }
    }
};
const metaHandler_1 = __importDefault(require("./route/handler/metaHandler"));
const metaMiddleware_1 = __importDefault(require("./route/middleware/metaMiddleware"));
require('dotenv').config();
// routhr.use((req, res, next) => {
//     console.log(req.headers.host);
//     if (req.headers.host !== "spacre.com") {
//         res.status(500).send({
//             message: 'Not Authorized to call this API'
//         })
//     } else {
//         next()
//     }
// })
const app = (0, express_1.default)();
const api_version = process.env.API_VERSION || 'api/v1';
app.use(cors(corsOptions));
// REGISTER ROUTES
app.get('/', (req, res) => { res.send({ message: 'use api/v1/' }); });
app.get('/api/v1', (req, res) => { res.send({ message: 'latest version' }); });
app.get(`/${api_version}/meta/lookup`, metaMiddleware_1.default, metaHandler_1.default);
// Start API
app.listen(port);
