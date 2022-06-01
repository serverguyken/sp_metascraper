import { RequestInterface, ResponseInterface, NextFunctionInterface } from "routhr"; 
const lookUpMiddleware = (req: RequestInterface, res: ResponseInterface, next: NextFunctionInterface) => {
    const url: any = req.routhr?.route?.queries?.url;
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

export default lookUpMiddleware;