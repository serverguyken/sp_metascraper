
import { RequestInterface, ResponseInterface, NextFunctionInterface } from "routhr";
const lookUpMiddleware = (req: RequestInterface, res: ResponseInterface, next: NextFunctionInterface) => {
    const url: any = req.query.url;
    if (!url || url === "") {
        res.status(400).send({
            message: "Missing url parameter.",
        });
    }

    else {
        req.url = url;
        next();
    }
};

export default lookUpMiddleware;