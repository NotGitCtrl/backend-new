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
  const arunachal_pradesh = await stateModel.findOne({ name: "Arunachal Pradesh" });
  const assam = await stateModel.findOne({ name: "Assam" });
  const bihar = await stateModel.findOne({ name: "Bihar" });
  const chhatisgarh = await stateModel.findOne({ name: "Chhattisgarh" });
  const goa = await stateModel.findOne({ name: "Goa" });
  const gujarat = await stateModel.findOne({ name: "Gujrat" });
  const haryana = await stateModel.findOne({ name: "Haryana" });
  const himachal_pradesh = await stateModel.findOne({ name: "Himachal pradesh" });
  const jharkhand = await stateModel.findOne({ name: "Jharkhand " });
  const karnataka = await stateModel.findOne({ name: "Karnataka" });
  const kerala = await stateModel.findOne({ name: "Kerala" });
  const madhya_pradesh = await stateModel.findOne({ name: "Madhya pradesh" });
  const manipur = await stateModel.findOne({ name: "Manipur" });
  const meghalaya  = await stateModel.findOne({ name: "Meghalaya" });
  const mizoram  = await stateModel.findOne({ name: "Mizoram" });
  const nagaland  = await stateModel.findOne({ name: "Nagaland" });
  const odisha  = await stateModel.findOne({ name: "Odisha" });
  const puducherry  = await stateModel.findOne({ name: "Puducherry" });
  const punjab  = await stateModel.findOne({ name: "Punjab" });
  const rajasthan  = await stateModel.findOne({ name: "Rajasthan" });
  const sikkim  = await stateModel.findOne({ name: "Sikkim" });
  const tamil_nadu  = await stateModel.findOne({ name: "Tamil Nadu" });
  const telangana  = await stateModel.findOne({ name: "Telangana" });
  const tripura  = await stateModel.findOne({ name: "Tripura" });
  const uttarakhand  = await stateModel.findOne({ name: "Uttarakhand" });
  const uttar_pradesh  = await stateModel.findOne({ name: "Uttar Pradesh" });
  const west_bengal  = await stateModel.findOne({ name: "West Bengal" });
  const andaman_and_nicobar_islands  = await stateModel.findOne({ name: "Andaman and Nicobar Islands" });
  const chandigarh  = await stateModel.findOne({ name: "Chandigarh" });
  const dadra_and_nagar_haveli_and_daman_diu  = await stateModel.findOne({ name: "Dadra and Nagar Haveli and Daman and Diu" });
  const delhi  = await stateModel.findOne({ name: "Delhi" });
  const jammu_and_kashmir = await stateModel.findOne({name: "Jammu and Kashmir"});
  const ladakh  = await stateModel.findOne({ name: "Ladakh" });
  const lakshadweep  = await stateModel.findOne({ name: "Lakshadweep" });
  
  const seedDistrict = [
    {
      name: "Nicobar",
      state: andaman_and_nicobar_islands.id
    },
    {
      name: "North and Middle Andaman",
      state: andaman_and_nicobar_islands.id
    },
    {
      name: "South Andaman",
      state: andaman_and_nicobar_islands.id
    },

    {
      name: "Chandigarh",
      state: chandigarh.id
    },
    
    {
      name: "Dadra and Nagar Haveli",
      state: dadra_and_nagar_haveli_and_daman_diu.id
    },
    {
      name: "Daman",
      state: dadra_and_nagar_haveli_and_daman_diu.id
    },
    {
      name: "Diu",
      state: dadra_and_nagar_haveli_and_daman_diu.id
    },

    {
      name: "Central Delhi",
      state: delhi.id
    },
    {
      name: "East Delhi",
      state: delhi.id
    },
    {
      name: "New Delhi",
      state: delhi.id
    },
    {
      name: "South Delhi",
      state: delhi.id
    },

  
    {
      name: "Leh",
      state: ladakh.id
    },
    {
      name: "Kargil",
      state: ladakh.id
    },

    {
      name: "Lakshadweep",
      state: lakshadweep.id
    },

    {
      name: "Karaikal",
      state: puducherry.id
    },
    {
      name: "Yanam",
      state: puducherry.id
    },
    {
      name: "Mahe",
      state: puducherry.id
    },
    {
      name: "Pondicherry",
      state: puducherry.id
    },
    {
      name: "Mumbai",
      state: maharashtra._id,
    },
    {
      name: "Thane",
      state: maharashtra._id,
    },
    {
      name: "Nanded",
      state: maharashtra._id,
    },
    {
      name: "Sindhudurg",
      state: maharashtra._id,
    },
    {
      name: "Chittoor",
      state: andhra_pradesh.id
    },
    {
      name: "Anakapelle",
      state: andhra_pradesh.id
    },
    {
      name: "East Godavari",
      state: andhra_pradesh.id
    },
    {
      name: "Nellore",
      state: andhra_pradesh.id
    },

    {
      name: "Anjaw",
      state: arunachal_pradesh.id
    },
    {
      name: "Lohit",
      state: arunachal_pradesh.id
    },
    {
      name: "Tawang",
      state: arunachal_pradesh.id
    },
    {
      name: "Kamle",
      state: arunachal_pradesh.id
    },

    {
      name: "Baksa",
      state: assam.id
    },
    {
      name: "Majuli",
      state: assam.id
    },
    {
      name: "Hojai",
      state: assam.id
    },
    {
      name: "Dhubri",
      state: assam.id
    },

    {
      name: "Arwal",
      state: bihar.id
    },
    {
      name: "Nalanda",
      state: bihar.id
    },
    {
      name: "Gaya",
      state: bihar.id
    },
    {
      name: "Bhojpur",
      state: bihar.id
    },

    {
      name: "Durg",
      state: chhatisgarh.id
    },
    {
      name: "Korba",
      state: chhatisgarh.id
    },
    {
      name: "Raipur",
      state: chhatisgarh.id
    },
    {
      name: "Bilaspur",
      state: chhatisgarh.id
    },

    {
      name: "North Goa",
      state: goa.id
    },
    {
      name: "South Goa",
      state: goa.id
    },
    
    {
      name: "Bhavnagar",
      state: gujarat.id
    },
    {
      name: "Botad",
      state: gujarat.id
    },
    {
      name: "Valsad",
      state: gujarat.id
    },
    {
      name: "Surat",
      state: gujarat.id
    },

    {
      name: "Karnal",
      state: haryana.id
    },
    {
      name: "Jind",
      state: haryana.id
    },
    {
      name: "Hisar",
      state: haryana.id
    },
    {
      name: "Rohtak",
      state: haryana.id
    },

    {
      name: "Kullu",
      state: himachal_pradesh.id
    },
    {
      name: "Una",
      state: himachal_pradesh.id
    },
    {
      name: "Mandi",
      state: himachal_pradesh.id
    },
    {
      name: "Solan",
      state: himachal_pradesh.id
    },

    {
      name: "Reasi",
      state: jammu_and_kashmir.id
    },
    {
      name: "Anantnag",
      state: jammu_and_kashmir.id
    },
    {
      name: "Baramulla",
      state: jammu_and_kashmir.id
    },
    {
      name: "Doda",
      state: jammu_and_kashmir.id
    },

    {
      name: "Garwaha",
      state: jharkhand.id
    },
    {
      name: "Godda",
      state: jharkhand.id
    },
    {
      name: "Palamu",
      state: jharkhand.id
    },
    {
      name: "Dumka",
      state: jharkhand.id
    },

    {
      name: "Bagalkot",
      state: karnataka.id
    },
    {
      name: "Mysuru",
      state: karnataka.id
    },
    {
      name: "Raichur",
      state: karnataka.id
    },
    {
      name: "Gadag",
      state: karnataka.id
    },

    {
      name: "Ernakulam",
      state: kerala.id
    },
    {
      name: "Kannur",
      state: kerala.id
    },
    {
      name: "Kollam",
      state: kerala.id
    },
    {
      name: "Waynad",
      state: kerala.id
    },

    {
      name: "Betul",
      state: madhya_pradesh.id
    },
    {
      name: "Bhopal",
      state: madhya_pradesh.id
    },
    {
      name: "Dindori",
      state: madhya_pradesh.id
    },
    {
      name: "Panna",
      state: madhya_pradesh.id
    },
    
    {
      name: "Ri Bhoi",
      state: meghalaya.id
    },
    {
      name: "North Garo Hills",
      state: meghalaya.id
    },
    {
      name: "East Garo Hills",
      state: meghalaya.id
    },
    {
      name: "East Khasi Hills",
      state: meghalaya.id
    },

    {
      name: "Aizawl",
      state: mizoram.id
    },
    {
      name: "Mamit",
      state: mizoram.id
    },
    {
      name: "Saiha",
      state: mizoram.id
    },
    {
      name: "Lunglei",
      state: mizoram.id
    },

    {
      name: "Longleng",
      state: nagaland.id
    },
    {
      name: "Kohima",
      state: nagaland.id
    },
    {
      name: "Mon",
      state: nagaland.id
    },
    {
      name: "Phek",
      state: nagaland.id
    },

    {
      name: "Angul",
      state: odisha.id
    },
    {
      name: "Boudh",
      state: odisha.id
    },
    {
      name: "Puri",
      state: odisha.id
    },
    {
      name: "Jaipur",
      state: odisha.id
    },

    {
      name: "Moga",
      state: punjab.id
    },
    {
      name: "Jalandhar",
      state: punjab.id
    },
    {
      name: "Mansa",
      state: punjab.id
    },
    {
      name: "Amritsar",
      state: punjab.id
    },

    {
      name: "Bikaner",
      state: rajasthan.id
    },
    {
      name: "Udaipur",
      state: rajasthan.id
    },
    {
      name: "Nagaur",
      state: rajasthan.id
    },
    {
      name: "Barner",
      state: rajasthan.id
    },

    {
      name: "East Sikkim",
      state: sikkim.id
    },
    {
      name: "North Sikkim",
      state: sikkim.id
    },
    {
      name: "South Sikkim",
      state: sikkim.id
    },
    {
      name: "West Sikkim",
      state: sikkim.id
    },

    {
      name: "Chennai",
      state: tamil_nadu.id
    },
    {
      name: "Madurai",
      state: tamil_nadu.id
    },
    {
      name: "Coimbatore",
      state: tamil_nadu.id
    },
    {
      name: "Chennai",
      state: tamil_nadu.id
    },

    {
      name: "Hyderabad",
      state: telangana.id
    },
    {
      name: "Warangal",
      state: telangana.id
    },
    {
      name: "Mulugu",
      state: telangana.id
    },
    {
      name: "Suryapet",
      state: telangana.id
    },

    {
      name: "Dhalai",
      state: tripura.id
    },
    {
      name: "Gomati",
      state: tripura.id
    },
    {
      name: "Khowai",
      state: tripura.id
    },
    {
      name: "Unakoti",
      state: tripura.id
    },

    {
      name: "Nainital",
      state: uttarakhand.id
    },
    {
      name: "Almora",
      state: uttarakhand.id
    },
    {
      name: "Dehradun",
      state: uttarakhand.id
    },
    {
      name: "Bageshwar",
      state: uttarakhand.id
    },

    {
      name: "Etah",
      state: uttar_pradesh.id
    },
    {
      name: "Gautam Buddha Nagar",
      state: uttar_pradesh.id
    },
    {
      name: "Lucknow",
      state: uttar_pradesh.id
    },
    {
      name: "Mainpuri",
      state: uttar_pradesh.id
    },

    {
      name: "Malda",
      state: west_bengal.id
    },
    {
      name: "Howrah",
      state: west_bengal.id
    },
    {
      name: "Bankura",
      state: west_bengal.id
    },
    {
      name: "Nadia",
      state: west_bengal.id
    },

    {
      name: "Chandel",
      state: manipur.id
    },
    {
      name: "Noney",
      state: manipur.id
    },
    {
      name: "Bishnupur",
      state: manipur.id
    },
    {
      name: "Kamjong",
      state: manipur.id
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