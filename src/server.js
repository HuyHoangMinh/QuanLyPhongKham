import express from "express";
import bodyParser from "body-parser";
import view_engine from "./config/view_engine";
import connectDB from "./config/connectdb";
import initWebRoutes from "./route/web";
require("dotenv").config();

let app = express();

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
