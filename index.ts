import routes from './route/routes';
import express, { Response } from 'express'
const port: any = process.env.PORT || 3002;
const cors = require('cors');
const whitelist = ['https://spacre.com', 'http://10.0.0.138:3000', 'http://localhost:3000', 'https://spacre-userapi.herokuapp.com']
const corsOptions = {
    origin: (origin: any, callback: any) => {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('No permission to call this API'))
        }
    }
}
import metaHandler from './route/handler/metaHandler'
import metaMiddleware from './route/middleware/metaMiddleware'
import { IRequest } from './interface';

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


const app = express()
const api_version = process.env.API_VERSION || 'api/v1';
app.use(cors(corsOptions))

// REGISTER ROUTES
app.get('/', (req: IRequest, res: Response) => { res.send({ message: 'use api/v1/' }) })
app.get('/api/v1', (req: IRequest, res: Response) => { res.send({ message: 'latest version' }) })
app.get(`/${api_version}/meta/lookup`, metaMiddleware, metaHandler)
// Start API
app.listen(port)