//-----######### IMPORTS ##########----------\\
import {dotenv} from dotenv;
dotenv.config();
import {express} from express;
//import {cors} from cors;
import loader from "./loader.js"

//-----######### SETUP ##########----------\\

const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 8080;

const app = express();

app.use("/assets", express.static("assets"));
app.use("/views", express.static("views"));

// LIMIT ACCESS TO THE API 
// app.use(cors());
// app.use(cors({
//     exposedHeaders: ["Location"]
// }));

// const permittedLinker = ["localhost", "127.0.0.1"]

app.listen(port, function(err){
    if (!err) {
        console.log("App is running on host: " + host + " and port: " + port);
    } else {
        console.log(err);
    }
})

module.exports = app;