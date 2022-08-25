const mongoose = require("mongoose");
require("dotenv").config();
const dbConnection = require("../utils/DBconnection");
const fundingAgencyModel = require("../schema/fundingAgency");
const countryModel = require("../schema/countries")
const stateModel = require("../schema/states")
const faAdminModel = require("../schema/users");

const connectToMongo = async () => {
    await dbConnection(process.env.MONGO_URI);
  };
  connectToMongo();

const seedData = async() =>{
    const india = await countryModel.findOne({ name: "India" });
    const maharashtra = await stateModel.findOne({ name: "Maharashtra" });
    const andhra_pradesh = await stateModel.findOne({ name: "Andhra Pradesh" });
    const assam = await stateModel.findOne({ name: "Assam" });
    const kerala = await stateModel.findOne({ name: "Kerala" });
    const faAdmin1 = await faAdminModel.findOne({email: "fa1@gmail.com" })
    const faAdmin2 = await faAdminModel.findOne({email: "fa2@gmail.com" })
    const faAdmin3 = await faAdminModel.findOne({email: "fa3@gmail.com" })
    const faAdmin4 = await faAdminModel.findOne({email: "fa4@gmail.com" })
    const faAdmin5 = await faAdminModel.findOne({email: "fa5@gmail.com" })
    const faAdmin6 = await faAdminModel.findOne({email: "fa6@gmail.com" })
    const faAdmin7 = await faAdminModel.findOne({email: "fa7@gmail.com" })
    const faAdmin8 = await faAdminModel.findOne({email: "fa8@gmail.com" })
    const faAdmin9 = await faAdminModel.findOne({email: "fa9@gmail.com" })
    const faAdmin10 = await faAdminModel.findOne({email: "fa10@gmail.com" })
    
    const seedFa = [
        {
            "name": "Jagjeevan Ltd.",
            "address": "Sangam Nagar",
            "country": india._id,
            "state": maharashtra._id,
            "admin": faAdmin1._id,
        },
        {   
            "name": "K.V Morgan LTD",
            "address": "Cecilia Chapman 711-2880 Nulla St. Mankato Mississippi 96522(257) 563-7401",
            "country": india._id,
            "state": maharashtra._id,
            "admin": faAdmin2._id,
        },
        {
            "name": "J.R.D Trust",
            "address": "606-3727 Ullamcorper. Street",
            "country": india._id,
            "state": maharashtra._id,
            "admin": faAdmin3._id,
        },
        {
            "name": "Tata Trust",
            "address": "Azusa New York 39531",
            "country": india._id,
            "state": maharashtra._id,
            "admin": faAdmin4._id,
        },
        {
            "name": "Reliance",
            "address": "7292 Dictum Av.",
            "country": india._id,
            "state": andhra_pradesh._id,
            "admin": faAdmin5._id,
        },
        {
            "name": "Johnson",
            "address": "San Antonio MI 47096",
            "country": india._id,
            "state": andhra_pradesh._id,
            "admin": faAdmin6._id,
        },
        {
            "name": "Parle",
            "address": "DTamuning PA 10855",
            "country": india._id,
            "state": andhra_pradesh._id,
            "admin": faAdmin6._id,
        },
        {
            "name": "Balaji",
            "address": "Corona New Mexico 08219",
            "country": india._id,
            "state": andhra_pradesh._id,
            "admin": faAdmin7._id,
        },
        {
            "name": "Vijay Trusts",
            "address": "O. Box 887 2508 Dolor. Av.",
            "country": india._id,
            "state": assam._id,
            "admin": faAdmin8._id,
        },
        {
            "name": "Himalaya",
            "address": "Santa Rosa MN 98804",
            "country": india._id,
            "state": assam._id,
            "admin": faAdmin9._id,
        },
    ]
    
    const importData = async () => {
        try {
          await fundingAgencyModel.deleteMany({});
          await fundingAgencyModel.insertMany(seedFa);
          console.log("Data imported successfully");
          process.exit();
        } catch (error) {
          console.log(error);
          res.status(500).json({ error });
        }
      };
    
      importData().then(() => {
        mongoose.connection.close();
      });
} 
seedData();

