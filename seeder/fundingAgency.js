const mongoose = require("mongoose");
require("dotenv").config();
const dbConnection = require("../utils/DBconnection");
const fundingAgencyModel = require("../schema/fundingAgency");

const connectToMongo = async () => {
    await dbConnection(process.env.MONGO_URI);
  };
  connectToMongo();

const seedFa = [
    {
    "name": "Jagjeevan Ltd.",
    "address": "Sangam Nagar",
    },
    {   
        "name": "K.V Morgan LTD",
        "address": "Cecilia Chapman 711-2880 Nulla St. Mankato Mississippi 96522(257) 563-7401"
    },
    {
        "name": "J.R.D Trust",
        "address": "606-3727 Ullamcorper. Street"
    },
    {
        "name": "Tata Trust",
        "address": "Azusa New York 39531"
    },
    {
        "name": "Reliance",
        "address": "7292 Dictum Av."
    },
    {
        "name": "Johnson",
        "address": "San Antonio MI 47096"
    },
    {
        "name": "Parle",
        "address": "DTamuning PA 10855"
    },
    {
        "name": "Balaji",
        "address": "Corona New Mexico 08219"
    },
    {
        "name": "Vijay Trusts",
        "address": "O. Box 887 2508 Dolor. Av."
    },
    {
        "name": "Himalaya",
        "address": "Santa Rosa MN 98804"
    },
    {
        "name": "Jagmohan",
        "address": "Erie Rhode Island 24975"
    },
    {
        "name": "Viraj Foundation",
        "address": "Woodruff SC 49854"
    },
    {
        "name": "Adhiraj Found",
        "address": "666-4366 Lacinia Avenue"
    },
    {
        "name": "Fusion LTD",
        "address": "Idaho Falls Ohio 19253"
    },
    {
        "name": "Arogya Foundation",
        "address": "Bethlehem Utah 02913"
    },
]