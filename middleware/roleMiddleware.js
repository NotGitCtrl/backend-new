const userModel = require("../schema/users");
const { verify, decode } = require("jsonwebtoken");
const { verifyToken } = require("../utils/index");

module.exports = async (req,res,next) => {
    let token = req.headers.authorization;
    if (token) {
        const tokenData = verifyToken(token); 
        const user = await userModel.findOne({ email: tokenData.email }).populate({ path: 'role'});
        req.user = user;
        next();
    } else {
        // Error Handling
    }
};
