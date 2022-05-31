import { NextFunction, Request, Response } from "express";
import { IRequest } from "../../interface";

const lookUpMiddleware = (req: IRequest, res: Response, next: NextFunction) => {
    const url: any = req.query.url;
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
        }
        next();
    }
};  

export default lookUpMiddleware;