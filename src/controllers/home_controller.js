import db from "../models/index";
import crudService from "../service/crud_service";
let login = (req, res) => {
  return res.send("AA");
};
let getHomePage = (req, res) => {
  return res.render("home.ejs");
};
let getAboutPage = (req, res) => {
  return res.render("component/about.ejs");
};
let getCRUD = (req, res) => {
  return res.render("component/crud.ejs");
};
let postCRUD = async (req, res) => {
  let data = await crudService.CreateNewUser(req.body);
  return res.send(data);
};
let putCRUD = async (req, res) => {
  let data = await crudService.UpdateUserById(req.body);
  console.log(data);
  return res.render("component/listusers.ejs", { data });
};
let getUser = async (req, res) => {
  let data = await crudService.GetUsers();
  return res.render("component/listusers.ejs", { data });
};

let editUser = async (req, res) => {
  let data = await crudService.GetUserById(req.query.id);
  console.log(data.user);
  return res.render("component/edituser.ejs", { user: data });
};

module.exports = {
  getHomePage,
  getAboutPage,
  getCRUD,
  postCRUD,
  getUser,
  editUser,
  putCRUD,
  login,
};
