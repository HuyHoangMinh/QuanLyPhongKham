import bcrypt from "bcryptjs";
import db from "../models/index";
const salt = bcrypt.genSaltSync(10);

let CheckUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    let userData = {
      errCode: 403,
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
          let checkPassword = await bcrypt.compareSync(password, user.password);
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
      userData.errCode = 500;
      userData.message = error.message;
      reject(userData);
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
module.exports = { CheckUserLogin };
