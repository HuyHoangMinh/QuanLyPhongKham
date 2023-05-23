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
  let id = req.query.id; // ALL or id
  let userData = await userService.getAllUsers(id);
  return res.status(200).json({
    errCode: null,
    message: "success",
    data: userData,
  });
};

let createNewUser = async (req, res) => {
  let userData = req.body; // ALL or id
  let result = await userService.createNewUser(userData);
  return res.status(200).json({
    errCode: result.errCode,
    errMsg: result.errMsg,
    data: result.data,
  });
};

let updateUser = async (req, res) => {
  let data = req.body; // ALL or id
  let result = await userService.updateUser(data);
  return res.status(200).json(result);
};

let deleteUser = async (req, res) => {
  let id = req.body.id; // ALL or id
  if (!id) {
    return res.status(200).json({ errCode: 2, message: "Missing id" });
  } else {
    let result = await userService.deleteUser(id);
    return res.status(200).json(result);
  }
};
module.exports = {
  userLogin,
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
