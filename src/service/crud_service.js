import bcrypt from "bcryptjs";
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

let CreateNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await HashUserPassword(data.password);
      data.password = hashPassword;
      await db.User.create(data);
      resolve("User created successfully");
    } catch (error) {
      reject(error);
    }
  });
};
let GetUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let listUser = await db.User.findAll();
      resolve(listUser);
    } catch (error) {
      reject(error);
    }
  });
};
let GetUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = await db.User.findOne({ where: { id: userId } });
      if (userData) resolve(userData);
      else reject("User not found");
    } catch (error) {
      reject(error);
    }
  });
};
let UpdateUserById = (dataUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(dataUser);
      let user = await db.User.findOne({ where: { id: dataUser.id } });
      if (user) {
        let hashPassword = await HashUserPassword(user.password);
        user.password = hashPassword;
        await db.User.Update(user);
        let listUser = await db.User.findAll();
        resolve(listUser);
      }
    } catch (error) {
      reject(error);
    }
  });
};
let EditUser = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await db.User.findOne(userId);
    return res.send(userData);
  } else return res.send("User not found");
};
let DeleteUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let listUser = await db.User.findAll();
      console.log(listUser.User);
      resolve(listUser);
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
module.exports = {
  CreateNewUser,
  GetUsers,
  GetUserById,
  EditUser,
  DeleteUser,
  UpdateUserById,
};
