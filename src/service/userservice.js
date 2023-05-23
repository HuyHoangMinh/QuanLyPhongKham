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
let HashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};
let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isExist = await CheckUserEmail(data.email);
      if (isExist) {
        resolve({
          errCode: 0,
          errMsg: `${data.email} is exists`,
          data: null,
        });
      } else {
        let hashPassword = await HashUserPassword(data.password);
        data.password = hashPassword;
        console.log(data);
        await db.User.create(data);
        resolve({ errCode: null, errMsg: null, data: data });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userId = data.id;
      if (!userId) {
        resolve({ errCode: 2, message: "Missing userid" });
      }
      let user = await db.User.findOne({
        where: { id: userId },
        attributes: ["email", "password", "id", "roleId"],
      });
      if (!user) {
        resolve({ errCode: 2, message: "user isn't exists" });
      }
      delete data.password;
      delete data.email;
      await db.User.update(data, { where: { id: userId } });
      resolve({ errCode: null, message: "user is updated" });
    } catch (error) {
      reject(error);
    }
  });
};

let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
      });
      console.log(user);
      if (!user) {
        resolve({ errCode: 2, message: "user isn't exists" });
      }
      await db.User.destroy({ where: { id: userId } });
      resolve({ errCode: null, message: "user is deleted" });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  CheckUserLogin,
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
