import Routhr from 'routhr';
import OriginMiddleware from './route/middleware';
const port: any = process.env.PORT || 3002;
const routhr = new Routhr(port);
const cors = require('cors');
const whitelist = ['https://spacre.com', 'http://10.0.0.138:3000', 'http://localhost:3000']
const corsOptions = {
    origin: (origin: any, callback: any) => {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else if (!origin) {
           
        } else {
            callback(new Error('No permission to call this API'))
        }
    }
}
require('dotenv').config();
import routes from './route/routes';
routhr.use(cors());
routhr.use(OriginMiddleware)
routhr.use(routhr.middleware.bodyParser.json);
// REGISTERING ROUTES
routhr.useRoutes(routes);
// STARTING SERVER
routhr.start();