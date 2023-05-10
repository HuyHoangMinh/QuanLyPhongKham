import express from "express";
import homeController from "../controllers/home_controller";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUD);
  return app.use("/", router);
};
module.exports = initWebRoutes;
