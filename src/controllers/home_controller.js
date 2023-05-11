let getHomePage = (req, res) => {
  return res.render("home.ejs");
};
let getAboutPage = (req, res) => {
  return res.render("component/about.ejs");
};
let getCRUD = (req, res) => {
  return res.render("component/crud.ejs");
};
let postCRUD = (req, res) => {
  console.log(req.body);
  return res.send(req.body);
};
module.exports = {
  getHomePage,
  getAboutPage,
  getCRUD,
  postCRUD,
};
