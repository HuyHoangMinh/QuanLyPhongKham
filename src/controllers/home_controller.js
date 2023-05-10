let getHomePage = (req, res) => {
  return res.render("home.ejs");
};
let getAboutPage = (req, res) => {
  return res.render("component/about.ejs");
};
let getCRUD = (req, res) => {
  return res.send("Get CRUD");
};
module.exports = {
  getHomePage,
  getAboutPage,
  getCRUD,
};
