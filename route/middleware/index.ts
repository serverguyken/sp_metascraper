import { RequestInterface, ResponseInterface, NextFunctionInterface } from "routhr";

const acceptableHost = {
    local: 'localhost:3000',
    network: '10.0.0.138:3004',
    spacre: 'spacre.com',
    spacre_user_api: 'spacreuserapi.spacre.com',
    heroku: 'spacre-userapi.herokuapp.com'
}

export const checkHost = (req: RequestInterface) => {
    if (req.headers.host === acceptableHost.local  || req.headers.host === acceptableHost.network || req.headers.host === acceptableHost.spacre || req.headers.host === acceptableHost.spacre_user_api || req.headers.host === acceptableHost.heroku) {
        return true
    } else {
        return false
    }  
}

const OriginMiddleware = (req: RequestInterface, res: ResponseInterface, next: NextFunctionInterface) => {
    if (checkHost(req)) {
        next()
    } else {
        res.status(500).send({
            message: 'Not Authorized to call this API'
        })
    }  
};

export default OriginMiddleware;