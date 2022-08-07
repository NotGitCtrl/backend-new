const userModel = require("../schema/users");
const heiModel = require("../schema/hei");
const fundingAgencyModel = require("../schema/fundingAgency");
const { hashPassword, signToken, verifyToken } = require("../utils");

async function redirectUser(user) {
    await user.populate({
      path: 'role',
      select: ['name'],
  })
  console.log(user.role.name)
  if(user.role.name == "HEI Admin"){
    const hei = await heiModel.findOne({ heiAdmin: user._id });
    if(hei){
      return {
        "user_id": user._id,
        "role": user.role.name,
        "redirect": 0
      }
    }else{
      return {
        "user_id": user._id,
        "role": user.role.name,
        "redirect": 1
      }
    }
  }else if(user.role.name == "FA Admin"){
    const fa = await fundingAgencyModel.findOne({ admin: user._id });
    if(fa){
      return {
        "user_id": user._id,
        "role": user.role.name,
        "redirect": 0
      }
    }else{
      return {
        "user_id": user._id,
        "role": user.role.name,
        "redirect": 1
      }
    }
  }else{
    return {
      "user_id": user._id,
      "role": user.role.name
    }
  }
}

module.exports = {
  register: async (req, res) => {
    try {
      const { password, email } = req.body;

      const isEmailTaken = await userModel.findOne({ email });
      if (isEmailTaken)
        return res.status(400).json({ message: "Email already exists" });

      const { salt, hash } = hashPassword(password);

      delete req.body.password;

      userModel.create({ ...req.body, salt, hash });
      res.status(201).json({
        message: "User registered",
        token: signToken({ email: req.body.email }),
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  },
  login: async (req, res) => {
    try {
      const { password, email } = req.body;

      const userData = await userModel.findOne({ email });

      if (!userData)
        return res.status(400).json({ message: "User is not registered" });

      const hashedPass = hashPassword(password, userData.salt);

      if (hashedPass.hash === userData.hash) {
        //Redirect Checks after login 
        return res.status(200).json({
          message: "User logged in",
          token: signToken({ email: req.body.email }),
          data: await redirectUser(userData)
        });
      }
      return res.status(400).json({ message: "Incorrect password" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  },
};
