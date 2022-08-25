const mongoose = require("mongoose");
const userModel = require("../schema/users");
const crypto = require("crypto");
require("dotenv").config();
const dbConnection = require("../utils/DBconnection");
const countryModel = require("../schema/countries");
const stateModel = require("../schema/countries");
const roleModel = require("../schema/role");
const heiModel = require("../schema/hei");
const projectModel = require("../schema/projects");
const connectToMongo = async () => {
  await dbConnection(process.env.MONGO_URI);
};
connectToMongo();


const importData = async () => {
  try {
    const seedProject = [];
    const heis = await heiModel.find();
    heis.forEach((h, i) => {
      seedProject.push({
        name: `Lorem ipsum dolor sit amet, consectetur adipiscing elit`,
        description: `Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam erat volutpat. Sed placerat, lectus convallis dapibus convallis, ligula velit imperdiet ligula, sed maximus orci sapien vel lorem. Pellentesque id metus pharetra velit mollis cursus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum venenatis lectus quis tortor condimentum volutpat`,
        hei: h._id,
        approvedAmount: Math.floor(100000 + Math.random() * 900000),
        category: "software",
        heiCoordinator: h.spoc,
      });
    });
    // await projectModel.remove({});
    await projectModel.insertMany(seedProject);
    console.log("Data imported successfully");
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

importData().then(() => {
  mongoose.connection.close();
});