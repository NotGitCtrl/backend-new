const mongoose = require("mongoose");
require("dotenv").config();
const dbConnection = require("../utils/DBconnection");
const countryModel = require("../schema/countries");

const connectToMongo = async () => {
  await dbConnection(process.env.MONGO_URI);
};
connectToMongo();

const stateModel = require("../schema/states");

const seedData = async () => {
  const india = await countryModel.findOne({ name: "India" });

  const seedState = [
    {
      name: "Maharashtra",
      country: india._id,
    },
    {
      name: "Odisha",
      country: india._id,
    },
    {
      name: "Tamil Nadu",
      country: india._id,
    },
    {
      name: "Assam",
      country: india._id,
    },
    {
      name: "Goa",
      country: india._id,
    },
    {
      name: "Rajasthan",
      country: india._id,
    },
    {
      name: "Arunanchal Pradesh",
      country: india._id,
    },
    {
      name: "Himachal Pradesh",
      country: india._id,
    },
    {
      name: "Chattisgarh",
      country: india._id,
    },
    {
      name: "West Bengal",
      country: india._id,
    },
    {
      name: "Haryana",
      country: india._id,
    },
    {
      name: "Gujrat",
      country: india._id,
    },
    {
      name: "Karnataka",
      country: india._id,
    },
    {
      name: "Bihar",
      country: india._id,
    },
    {
      name: "Uttar Pradesh",
      country: india._id,
    },
    {
      name: "Jharkhand",
      country: india._id,
    },
    {
      name: "Meghalaya",
      country: india._id,
    },
    {
      name: "Nagaland",
      country: india._id,
    },
    {
      name: "Mizoram",
      country: india._id,
    },
    {
      name: "Sikkim",
      country: india._id,
    },
    {
      name: "Kerala",
      country: india._id,
    },
    {
      name: "Punjab",
      country: india._id,
    },
    {
      name: "Andhra Pradesh",
      country: india._id,
    },
    {
      name: "Madhya Pradesh",
      country: india._id,
    },
  ];

  const importData = async () => {
    try {
      await stateModel.deleteMany({});
      await stateModel.insertMany(seedState);
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
};
seedData();
