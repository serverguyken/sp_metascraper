//import { RouteInterface } from 'routhr';
type MiddlewareInterface = (req: Request, res: Response, next: NextFunction) => void;
export interface RouteInterface {
    /**
     *The specified path of the route
    **/
    path: string;
    /**
     *The method of the route
    **/
    method: string;
    /**
     * A Function that handles the request and response object.
     * @param req - Request object
     * @param res - Response object
     * @param next - Next function - optional
     */
    handler: (req: Request, res: Response, next?: NextFunction) => void;
    /**
     * A function that handles the middleware for the given route. It is optional.
     * @param req - Request object
     * @param res - Response object
     * @param next - Next function
    **/
    middleware?: MiddlewareInterface;
    /**
     * An array of middleware functions that handles the middleware for the given route. It is optional.
     * @param req - Request object
     * @param res - Response object
     * @param next - Next function
    **/
    middlewares?: MiddlewareInterface[];
}
const api_version = process.env.API_VERSION || 'api/v1';
import metaHandler from './handler/metaHandler';
import metaMiddleware from './middleware/metaMiddleware';
import { NextFunction, Request, Response } from 'express';
const routes: RouteInterface[] = [
    {
        path: `/`,
        method: 'GET',
        handler: (req, res) => {
            res.send({
                message: 'use api/v1/'
            })
        },
    },
    {
        path: `/api/v1`,
        method: 'GET',
        handler: (req, res) => {
            res.send({
                message: 'latest version'
            })
        },
    },
    {
        path: `/favicon.ico`,
        method: 'GET',
        handler: (req, res) => {
            res.status(200).json({
                message: 'no favicon'
            })
        },
    },
    {
        path: `/${api_version}/meta/lookup`,
        method: 'GET',
        handler: metaHandler,
        middleware: metaMiddleware,
    },
];

export default routes;