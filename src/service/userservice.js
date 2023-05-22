import bcrypt from "bcryptjs";
import db from "../models/index";
const salt = bcrypt.genSaltSync(10);

let CheckUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    let userData = {
      errCode: 401,
      message: "email or password not found",
      data: null,
    };
    try {
      let isExist = await CheckUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          where: { email: email },
          attributes: ["email", "password", "id", "roleId"],
          raw: true,
        });
        if (user) {
          let checkPassword = await bcrypt.compare(password, user.password);
          if (checkPassword) {
            delete user.password;
            userData.errCode = null;
            userData.message = "success";
            userData.data = user;
          }
        }
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};
let CheckUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { email: userEmail } });
      if (user) resolve(true);
      else resolve(false);
    } catch (error) {
      reject(error);
    }
  });
};
let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId && userId !== "ALL")
        users = await db.User.findOne({
          where: { id: userId },
          attributes: { exclude: ["password"] },
        });
      else
        users = await db.User.findAll({
          attributes: { exclude: ["password"] },
        });
      console.log(users);
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = { CheckUserLogin, getAllUsers };
