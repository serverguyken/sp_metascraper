"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lookUpMiddleware = (req, res, next) => {
    var _a, _b, _c;
    const url = (_c = (_b = (_a = req.routhr) === null || _a === void 0 ? void 0 : _a.route) === null || _b === void 0 ? void 0 : _b.queries) === null || _c === void 0 ? void 0 : _c.url;
    console.log(url);
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
        next();
    }
};
exports.default = lookUpMiddleware;
