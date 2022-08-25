const mongoose = require("mongoose");
const userModel = require("../schema/users");
const crypto = require("crypto");
require("dotenv").config();
const dbConnection = require("../utils/DBconnection");
const countryModel = require("../schema/countries");
const stateModel = require("../schema/countries");
const roleModel = require("../schema/role");
const connectToMongo = async () => {
  await dbConnection(process.env.MONGO_URI);
};
connectToMongo();


const importData = async () => {
  try {
    const country = await countryModel.find({ name: "India" });
    const seedHeiAdmins = [];
    const role = await roleModel.find({ name: "hei-admin" });
    // const oldUsers = await userModel.find({ role: role._id });
    for (let i = 1; i < 500; i++) {
      seedHeiAdmins.push({
        firstName: `HEI`,
        lastName: `${i}`,
        email: `hei-admin-${i}@gmail.com`,
        hash: "",
        salt: "",
        mobile: "5869437212",
        country: country._id,
        gender: "male",
        role: role._id,
      });
    }
    await userModel.deleteMany({ role: role._id });
    await userModel.insertMany(seedHeiAdmins);
    let users = await userModel.find({});
    for (let i in users) {
      let userId = users[i]._id;
      const salt = crypto.randomBytes(16).toString("hex");
      let hash = crypto
        .pbkdf2Sync("password", salt, 1000, 64, `sha512`)
        .toString(`hex`);
      await userModel.findOneAndUpdate(
        { _id: userId },
        { hash: hash, salt: salt }
      );
    }
    console.log("Data imported successfully");
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

importData().then(() => {
  mongoose.connection.close();
});