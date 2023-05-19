import express from "express";
import homeController from "../controllers/home_controller";
import userController from "../controllers/usercontroller";

let router = express.Router();

let initWebRoutes = (app) => {
  router.post("/api/login", userController.userLogin);
  router.get("/", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.put("/put-crud", homeController.putCRUD);

  router.get("/list-user", homeController.getUser);
  router.get("/edit-user", homeController.editUser);

  return app.use("/", router);
};
module.exports = initWebRoutes;
