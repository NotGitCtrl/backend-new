const stateModel = require("../../schema/states");
const returnMessage = require("../message");
const messages = require("../../lang/messages.json");
const authUser = require("../../utils/authUser");

module.exports = {
  index: async (req, res) => {
    try {
      const states = await stateModel.find().populate({ path: 'country', select: ["name"]});
      returnMessage.successMessage(res,messages.successMessages.getAllStates,states);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  create: async (req, res) => {
    try {
      if (req.user.role.name == "super-admin") {
        let user = await authUser.getUser(req, res);
        const state = await stateModel.create({
          country: req.body.country_id,
          name: req.body.name,
          createdBy: user._id,
        });
        await state.populate({
          path: "country",
          select: ["name"],
        });
        returnMessage.successMessage(res,messages.successMessages.addState,state);
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  edit: async (req, res) => {
    try {
      if (req.user.role.name == "super-admin") {
        const state = await stateModel.findOne({ _id: req.params["id"] }).populate({ path: "country", select: ["name"]});
        returnMessage.successMessage(res,messages.successMessages.showState,state);
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  update: async (req, res) => {
    try {
      if (req.user.role.name == "super-admin") {
        const state = await stateModel.findByIdAndUpdate(
          req.params["id"],
          {
            country: req.body.country_id,
            name: req.body.name,
            updatedBy: req.user._id,
          },
          { new: true }
        );
        await state.populate({
          path: "country",
          select: ["name"],
        });
        returnMessage.successMessage(res,messages.successMessages.updateState,state);
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  // delete: async (req, res) => {
  //   try {
  //     const state = await stateModel.remove({ _id: req.params["id"] });
  //     returnMessage.successMessage(
  //       res,
  //       messages.successMessages.deletestate,
  //       state
  //     );
  //   } catch (error) {
  //     returnMessage.errorMessage(res, error);
  //   }
  // },
  show: async (req, res) => {
    try {
      const state = await stateModel.findOne({ _id: req.params["id"] }).populate({ path: "country", select: ["name"]});
      returnMessage.successMessage(res,messages.successMessages.showstate,state);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
};
