const mongoose = require("mongoose");
require("dotenv").config();
const crypto = require("crypto");
const dbConnection = require("../utils/DBconnection");
const countryModel = require("../schema/countries");
const roleModel = require("../schema/role");
const connectToMongo = async () => {
  await dbConnection(process.env.MONGO_URI);
};
connectToMongo();
const userModel = require("../schema/users");

const importData = async () => {
  try {
    const country = await countryModel.find({ name: "India" });
    const seedHeiSpocs = [];
    const role = await roleModel.find({ name: "hei-spoc" });

    for (let i = 1; i < 500; i++) {
      seedHeiSpocs.push({
        firstName: `HEI SPOC`,
        lastName: `${i}`,
        email: `hei-spoc-${i}@gmail.com`,
        hash: "",
        salt: "",
        mobile: "5869437212",
        country: country._id,
        gender: "male",
        role: role._id,
      });
    }
    // await userModel.deleteMany({ role: role._id });
    await userModel.insertMany(seedHeiSpocs);
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