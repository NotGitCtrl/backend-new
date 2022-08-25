const mongoose = require("mongoose");
const userModel = require("../schema/users");
const crypto = require("crypto");
require("dotenv").config();
const dbConnection = require("../utils/DBconnection");
const countryModel = require("../schema/countries");
const stateModel = require("../schema/countries");
const roleModel = require("../schema/role");
const hei = require("../schema/hei");
const connectToMongo = async () => {
  await dbConnection(process.env.MONGO_URI);
};
connectToMongo();


const importData = async () => {
  try {
    const seedProject = [];
    
    const heis = await heiModel.find();
    
    // const oldUsers = await userModel.find({ role: role._id });
    heis.forEach((h, i) => {
        seedProject.push({
            name: `Lorem ipsum dolor sit amet, consectetur adipiscing elit`,
            description: `Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam erat volutpat. Sed placerat, lectus convallis dapibus convallis, ligula velit imperdiet ligula, sed maximus orci sapien vel lorem. Pellentesque id metus pharetra velit mollis cursus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum venenatis lectus quis tortor condimentum volutpat`,
            hei: h._id,
        });
      });

    for (let i = 1; i < 500; i++) {
      seedProject.push({
        name: `Lorem ipsum dolor sit amet, consectetur adipiscing elit`,
        description: `Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam erat volutpat. Sed placerat, lectus convallis dapibus convallis, ligula velit imperdiet ligula, sed maximus orci sapien vel lorem. Pellentesque id metus pharetra velit mollis cursus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum venenatis lectus quis tortor condimentum volutpat`,
        hei

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