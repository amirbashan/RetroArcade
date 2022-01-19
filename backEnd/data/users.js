const { query } = require("../lib/db");
const { uuid } = require("uuidv4");

async function addUser(email, password, name) {
  try {
    const plainAvatar = "http://alpha-baseball.com/wp-content/uploads/2016/11/blank-avatar.png";
    const sql = `INSERT INTO users (id,email, password,name,avatar,isAdmin) VALUES ('${uuid()}','${email}', '${password}','${name}','${plainAvatar}',false)`;
    const user = await query(sql);
    return user;
  } catch (err) {
    console.log(err);
  }
}

//for login (does user exist)
async function getUserByEmail(email) {
  try {
    const sql = `SELECT id,email,password,isAdmin FROM users WHERE email='${email}'`;
    const user = await query(sql);
    return user[0];
  } catch (err) {
    console.log(err);
  }
}

async function getUserById(id) {
  try {
    const sql = `SELECT * FROM users WHERE id='${id}'`;
    const user = await query(sql);
    return user[0];
  } catch (err) {
    console.log(err);
  }
}

async function editUser(id, email, name, avatar) {
  try {
    const sql = `UPDATE users SET email = '${email}',name = '${name}', avatar = '${avatar}' WHERE id='${id}';`;
    const response = await query(sql);
    return response;
  } catch (err) {
    console.log(err);
  }
}

async function getFullUsersList() {
  try {
    const sql = `SELECT id,email,name,avatar,isAdmin,created_date FROM users`;
    const list = await query(sql);
    return list;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { addUser, getUserByEmail, getUserById, editUser, getFullUsersList };
