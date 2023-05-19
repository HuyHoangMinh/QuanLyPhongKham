import userService from "../service/userservice";
let userLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(403).json({
      errCode: 403,
      message: "check your email or password!",
      data: null,
    });
  }
  let userData = await userService.CheckUserLogin(email, password);
  return res.status(200).json(userData);
};

module.exports = {
  userLogin,
};
