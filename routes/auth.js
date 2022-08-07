const user = require("../controllers/user");
const { registrationAuthRules, validateRegistration,loginAuthRules, validateLogin } = require('../validations/UserValidations')
const router = require("express").Router();

router.post("/register", user.register);
router.post("/login",loginAuthRules(), validateLogin, user.login);

module.exports = router;
