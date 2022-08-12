const userModel = require("../schema/users");
const { verify } = require("jsonwebtoken");


module.exports = {
    getUser: async (req,res) => {
        let token = req.headers.authorization;
        if (token) {
          token = token.split(" ")[1];
          let decoded = verify(token, process.env.JWT_SECRET);
          req.user = decoded.email;
          const user = await userModel.findOne({ email: req.user });
          await user.populate({
            path: "role",
          });
          return user 
        } else {
          return res.status(401).json({ message: "unathorized user" });
        }
    }
};
