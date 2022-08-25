const mongoose = require("mongoose");
require("dotenv").config();
const dbConnection = require("../utils/DBconnection");
const countryModel = require("../schema/countries")
const heiModel = require("../schema/hei");
const userModel = require("../schema/users");
const roleModel = require("../schema/role")
const connectToMongo = async () => {
  await dbConnection(process.env.MONGO_URI);
};
connectToMongo();
const streamModel = require("../schema/streams");

const importData = async () => {
  try {
    const seedHeis = [];
    const heiAdminRole = await roleModel.find({ name: "hei-admin" });
    const heiAdmins = await userModel.find({ role: heiAdminRole._id });
    const heiSpocRole = await roleModel.find({ name: "hei-spoc" });
    const country = await countryModel.find({ name: "India" });
    const spocs = await userModel.find({ role: heiSpocRole._id });
    heiAdmins.forEach((d, i) => {
      seedHeis.push({
        name: `HEI ${i}`,
        country: country._id,
        heiAdmin: d._id,
        spoc: spocs[i]._id,
      });
    });
    await heiModel.deleteMany({ name: { $exists: true }});
    await heiModel.insertMany(seedHeis);
    console.log("Data imported successfully");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

importData().then(() => {
  mongoose.connection.close();
});

// const seedStreams = [];
// for (let i = 1; i < 5; i++) {
//   seedStreams.push({
//     name: `Stream ${i}`,
//     description: "Sample Description",
//     courses: ["Course 1", "Course 2", "Course 3"],
//   });
// }