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

let getAllUsers = async (req, res) => {
  let id = req.body.id; // ALL or id
  let userData = await userService.getAllUsers(id);
  return res.status(200).json({
    errCode: null,
    message: "success",
    data: userData,
  });
};

module.exports = {
  userLogin,
  getAllUsers,
};
