const userModel = require("../schema/users");
const roleModel = require("../schema/role");
const heiModel = require("../schema/hei");
const fundingAgencyModel = require("../schema/fundingAgency");
const returnMessages = require("./message");
const messages = require("../lang/messages.json");
const {hashPassword, signToken, verifyToken} = require("../utils");
const authUser = require("../utils/authUser");

async function redirectUser(user) {
    await user.populate({
      path: "role",
      select: ["name"],
    });
    if (user.role.name == "hei-admin") {
      const hei = await heiModel.findOne({heiAdmin: user._id});
      if (hei) {
        return {
          user_id: user._id,
          role: user.role.name,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          redirect: 0,
        };
      } else {
        return {
          user_id: user._id,
          role: user.role.name,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          redirect: 1,
        };
      }
    } else if (user.role.name == "fa-admin") {
      const fa = await fundingAgencyModel.findOne({admin: user._id});
      if (fa) {
        return {
          user_id: user._id,
          role: user.role.name,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          redirect: 0,
        };
      } else {
        return {
          user_id: user._id,
          role: user.role.name,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          redirect: 1,
        };
      }
    } else {
      return {
        user_id: user._id,
        role: user.role.name,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
    }
  }

  module.exports = {
  register: async (req, res) => {
    try {
      const {password, email} = req.body;

      const isEmailTaken = await userModel.findOne({email});
      if (isEmailTaken)
        return res.status(400).json({message: "Email already exists"});

      const {salt, hash} = hashPassword(password);

      delete req.body.password;

      userModel.create({...req.body, salt, hash});
      res.status(201).json({
        message: "User registered",
        token: signToken({email: req.body.email}),
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({error});
    }
  },
  login: async (req, res) => {
    try {
      const {password, email} = req.body;

      const userData = await userModel.findOne({email});

      if (!userData)
        return res.status(400).json({message: "User is not registered"});

      const hashedPass = hashPassword(password, userData.salt);

      if (hashedPass.hash === userData.hash) {
        //Redirect Checks after login
        return res.status(200).json({
          message: "User logged in",
          token: signToken({email: req.body.email}),
          data: await redirectUser(userData),
        });
      }
      return res.status(400).json({message: "Incorrect password"});
    } catch (error) {
      console.log(error);
      res.status(500).json({error});
    }
  },

  // list: async (req, res) => {
  //   try {
  //     var query = {};
  //     if (req.body.role_id) query = {role: req.body.role_id};

  //     const users = await userModel.find(query);
  //     returnMessages.successMessage(
  //       res,
  //       messages.successMessages.getAllheis,
  //       users
  //     );
  //   } catch (error) {
  //     console.log(error);
  //     returnMessages.errorMessage(res, error);
  //   }
  // },
  // show: async(req, res)=>{
  //   try {
  //     let user = await authUser.getUser(req, res);
  //     returnMessages.successMessage(
  //       res,
  //       messages.successMessages.showCountry,
  //       user
  //     );
  //   } catch (error) {
  //     returnMessages.errorMessage(res, error);
  //   }
  // },

  getUserAccToRole: async(req,res) => {
    try {
      let role = await roleModel.findOne({ name: req.body.name }); 
      let users = await userModel.find({ _id: role._id });
      returnMessages.successMessage(res,messages.successMessages.showUser, users);
    } catch (error) {
      returnMessages.errorMessage(res,error);
    }
  },
};
