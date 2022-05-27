import Routhr from 'routhr';
const port: any = process.env.PORT || 3002;
const routhr = new Routhr(port);
const cors = require('cors');
const whitelist = ['https://spacre.com', 'http://10.0.0.138:3000', 'http://localhost:3000']
const corsOptions = {
    origin: (origin: any, callback: any) => {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('No permission to call this API'))
        }
    }
}
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
routhr.use(cors(corsOptions));
routhr.use(routhr.middleware.bodyParser.json);
import routes from './route/routes';
routhr.useRoutes(routes);
routhr.start();