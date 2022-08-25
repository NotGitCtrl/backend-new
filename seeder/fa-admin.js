const mongoose = require("mongoose");
require("dotenv").config();
const dbConnection = require("../utils/DBconnection");
const roleModel = require("../schema/role");

const connectToMongo = async () => {
  await dbConnection(process.env.MONGO_URI);
};
connectToMongo();

const userModel = require("../schema/users");
const seedFaAdmin = [];

const seedData = async()=>{
    for(let i=1;i<=10;i++){
        const role = await roleModel.findOne({name: "fa-admin"});
        seedFaAdmin.push({
            email: `fa${i}@gmail.com`,
            hash: "",
            firstName: "FA",
            lastName: `Admin ${i}`,
            mobile: "5869437212",
            dob: "2018-12-10T13:45:00.000Z",
            salt: "",
            gender: "male",
            role: role._id,
          });  
    }

    const importData = async () => {
        try {
          await userModel.insertMany(seedFaAdmin);
          console.log("Data imported successfully");
          process.exit();
        } catch (error) {
          console.log(error);
          // res.status(500).json({ error });
        }
      };
    
      importData().then(() => {
        mongoose.connection.close();
      });

}

seedData();