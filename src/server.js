import express from "express";
import bodyParser from "body-parser";
import view_engine from "./config/view_engine";
import connectDB from "./config/connectdb";
import initWebRoutes from "./route/web";
const cors = require("cors");
require("dotenv").config();

let app = express();

const whitelist = ["http://localhost:3000", "http://localhost:8080"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

view_engine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
