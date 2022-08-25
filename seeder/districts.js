const mongoose = require("mongoose");
require("dotenv").config();
const dbConnection = require("../utils/DBconnection");
const stateModel = require("../schema/states");

const connectToMongo = async () => {
  await dbConnection(process.env.MONGO_URI);
};
connectToMongo();

const districtModel = require("../schema/districts");

const seedData = async () => {
  const maharashtra = await stateModel.findOne({ name: "Maharashtra" });
  const andhra_pradesh = await stateModel.findOne({ name: "Andhra Pradesh" });
  const assam = await stateModel.findOne({ name: "Assam" });
  const bihar = await stateModel.findOne({ name: "Bihar" });
  const goa = await stateModel.findOne({ name: "Goa" });
  const gujarat = await stateModel.findOne({ name: "Gujrat" });
  const haryana = await stateModel.findOne({ name: "Haryana" });
  const karnataka = await stateModel.findOne({ name: "Karnataka" });
  const kerala = await stateModel.findOne({ name: "Kerala" });
  const meghalaya  = await stateModel.findOne({ name: "Meghalaya" });
  const mizoram  = await stateModel.findOne({ name: "Mizoram" });
  const nagaland  = await stateModel.findOne({ name: "Nagaland" });
  const odisha  = await stateModel.findOne({ name: "Odisha" });
  const punjab  = await stateModel.findOne({ name: "Punjab" });
  const rajasthan  = await stateModel.findOne({ name: "Rajasthan" });
  const sikkim  = await stateModel.findOne({ name: "Sikkim" });
  const tamil_nadu  = await stateModel.findOne({ name: "Tamil Nadu" });
  const uttar_pradesh  = await stateModel.findOne({ name: "Uttar Pradesh" });
  const west_bengal  = await stateModel.findOne({ name: "West Bengal" });

  const seedDistrict = [

    
    

    {
      name: "Mumbai",
      state: maharashtra.__id,
    },
    {
      name: "Thane",
      state: maharashtra.__id,
    },
    {
      name: "Nanded",
      state: maharashtra.__id,
    },
    {
      name: "Sindhudurg",
      state: maharashtra.__id,
    },
    {
      name: "Chittoor",
      state: andhra_pradesh._id
    },
    {
      name: "Anakapelle",
      state: andhra_pradesh._id
    },
    {
      name: "East Godavari",
      state: andhra_pradesh._id
    },
    {
      name: "Nellore",
      state: andhra_pradesh._id
    },

    {
      name: "Baksa",
      state: assam._id
    },
    {
      name: "Majuli",
      state: assam._id
    },
    {
      name: "Hojai",
      state: assam._id
    },
    {
      name: "Dhubri",
      state: assam._id
    },

    {
      name: "Arwal",
      state: bihar._id
    },
    {
      name: "Nalanda",
      state: bihar._id
    },
    {
      name: "Gaya",
      state: bihar._id
    },
    {
      name: "Bhojpur",
      state: bihar._id
    },

    {
      name: "North Goa",
      state: goa._id
    },
    {
      name: "South Goa",
      state: goa._id
    },
    
    {
      name: "Bhavnagar",
      state: gujarat._id
    },
    {
      name: "Botad",
      state: gujarat._id
    },
    {
      name: "Valsad",
      state: gujarat._id
    },
    {
      name: "Surat",
      state: gujarat._id
    },

    {
      name: "Karnal",
      state: haryana._id
    },
    {
      name: "Jind",
      state: haryana._id
    },
    {
      name: "Hisar",
      state: haryana._id
    },
    {
      name: "Rohtak",
      state: haryana._id
    },

    {
      name: "Bagalkot",
      state: karnataka._id
    },
    {
      name: "Mysuru",
      state: karnataka._id
    },
    {
      name: "Raichur",
      state: karnataka._id
    },
    {
      name: "Gadag",
      state: karnataka._id
    },

    {
      name: "Ernakulam",
      state: kerala._id
    },
    {
      name: "Kannur",
      state: kerala._id
    },
    {
      name: "Kollam",
      state: kerala._id
    },
    {
      name: "Waynad",
      state: kerala._id
    },
    
    {
      name: "Ri Bhoi",
      state: meghalaya._id
    },
    {
      name: "North Garo Hills",
      state: meghalaya._id
    },
    {
      name: "East Garo Hills",
      state: meghalaya._id
    },
    {
      name: "East Khasi Hills",
      state: meghalaya._id
    },

    {
      name: "Aizawl",
      state: mizoram._id
    },
    {
      name: "Mamit",
      state: mizoram._id
    },
    {
      name: "Saiha",
      state: mizoram._id
    },
    {
      name: "Lunglei",
      state: mizoram._id
    },

    {
      name: "Longleng",
      state: nagaland._id
    },
    {
      name: "Kohima",
      state: nagaland._id
    },
    {
      name: "Mon",
      state: nagaland._id
    },
    {
      name: "Phek",
      state: nagaland._id
    },

    {
      name: "Angul",
      state: odisha._id
    },
    {
      name: "Boudh",
      state: odisha._id
    },
    {
      name: "Puri",
      state: odisha._id
    },
    {
      name: "Jaipur",
      state: odisha._id
    },

    {
      name: "Moga",
      state: punjab._id
    },
    {
      name: "Jalandhar",
      state: punjab._id
    },
    {
      name: "Mansa",
      state: punjab._id
    },
    {
      name: "Amritsar",
      state: punjab._id
    },

    {
      name: "Bikaner",
      state: rajasthan._id
    },
    {
      name: "Udaipur",
      state: rajasthan._id
    },
    {
      name: "Nagaur",
      state: rajasthan._id
    },
    {
      name: "Barner",
      state: rajasthan._id
    },

    {
      name: "East Sikkim",
      state: sikkim._id
    },
    {
      name: "North Sikkim",
      state: sikkim._id
    },
    {
      name: "South Sikkim",
      state: sikkim._id
    },
    {
      name: "West Sikkim",
      state: sikkim._id
    },

    {
      name: "Chennai",
      state: tamil_nadu._id
    },
    {
      name: "Madurai",
      state: tamil_nadu._id
    },
    {
      name: "Coimbatore",
      state: tamil_nadu._id
    },
    {
      name: "Chennai",
      state: tamil_nadu._id
    },

    {
      name: "Etah",
      state: uttar_pradesh._id
    },
    {
      name: "Gautam Buddha Nagar",
      state: uttar_pradesh._id
    },
    {
      name: "Lucknow",
      state: uttar_pradesh._id
    },
    {
      name: "Mainpuri",
      state: uttar_pradesh._id
    },

    {
      name: "Malda",
      state: west_bengal._id
    },
    {
      name: "Howrah",
      state: west_bengal._id
    },
    {
      name: "Bankura",
      state: west_bengal._id
    },
    {
      name: "Nadia",
      state: west_bengal._id
    },
  ];

  const importData = async () => {
    try {
      await districtModel.deleteMany({});
      await districtModel.insertMany(seedDistrict);
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
