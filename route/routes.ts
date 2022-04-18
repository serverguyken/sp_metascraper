import { RouteInterface } from 'routhr';
const api_version = process.env.API_VERSION || 'api/v1';
import metaHandler from './handler/metaHandler';
import metaMiddleware from '../middleware/metaMiddleware';
const routes: RouteInterface[] = [
    {
        path: `/${api_version}/meta/lookup`,
        method: 'GET',
        handler: metaHandler,
        middleware: metaMiddleware,
    },
];

export default routes;