"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lookUpMiddleware = (req, res, next) => {
    const url = req.query.url;
    if (!url || url === "") {
        res.status(400).send({
            status: {
                success: false,
                code: 400,
                message: "Missing url parameter.",
            }
        });
    }
    else {
        req.meta = {
            url
        };
        next();
    }
};
exports.default = lookUpMiddleware;
