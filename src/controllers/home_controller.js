let getHomePage = (req, res) => {
  return res.render("home.ejs");
};
let getAboutPage = (req, res) => {
  return res.render("component/about.ejs");
};
module.exports = {
  getHomePage,
  getAboutPage,
};
