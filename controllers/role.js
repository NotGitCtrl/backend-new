const Role = require("../schema/role");
const returnMessages = require("./message");
const messages = require("../lang/messages.json");

module.exports = {
  index: async (req, res) => {
    try {
      const role = await Role.find({});
      returnMessages.successMessage(
        res,
        messages.successMessages.getAllCountries,
        role
      );
    } catch (error) {
      returnMessages.errorMessage(res, error);
    }
  },
  create: async (req, res) => {
    try {
      let {name, permissions} = req.body;
      const role = new Role({
        name,
        permissions,
      });
      await role.save().then((data) => {
        returnMessages.successMessage(
          res,
          messages.successMessages.addRole,
          data
        );
      });
    } catch (error) {
      returnMessages.errorMessage(res, error);
    }
  },
};
