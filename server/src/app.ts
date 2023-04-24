import express, {Application, Request, Response} from "express"
const  bodyParser = require('body-parser')
import { sp } from "@pnp/sp-commonjs";
import { SPFetchClient } from "@pnp/nodejs-commonjs";
const cors = require("cors")
const dotenv = require("dotenv")
require("@pnp/sp-commonjs/webs");
require("@pnp/sp-commonjs/items");
const userRoute = require("./routes/userRoute")
const app: Application = express();
const port: number = 3001;
app.use(cors({origin: "*"}))
app.use(express.json())
app.use(express.urlencoded({extended : false}))
dotenv.config();

sp.setup({
    sp: {
    fetchClientFactory: () => { return new SPFetchClient(
        "https://3kz837.sharepoint.com/sites/mysite",
        "d8ffb65e-6c44-42ac-8694-d652b310f203",
        "uG8/uzxNvlybxdaKZ8XLh7nOrCjsDhbq/PMthm+Z+Dw=")}
     },
    });
    
app.use("/api", userRoute)

app.listen(port, ()=>console.log(`server running on port ${port}`))