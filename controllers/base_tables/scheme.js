const fundingAgencyModel = require("../../schema/fundingAgency");
const schemeModel = require("../../schema/schemes");
const returnMessage = require("../message");
const messages = require("../../lang/messages.json");
const authUser = require("../../utils/authUser");

module.exports = {
  index: async (req, res) => {
    try {
      const user = await userDetails.getUser(req,res);
      if(user.role.name == 'super-admin') {
        const schemes = await schemeModel.find();
        returnMessage.successMessage(
          res,
          messages.successMessages.getAllStates,
          schemes
        );
      } else if(user.role.name == 'fa-admin') {
        const fundingAgency = await fundingAgencyModel.find({ "admin": { $eq: user._id }});
        const schemes = await schemeModel.find({ "fundingAgency": { $eq: fundingAgency._id }});
        returnMessage.successMessage(
          res,
          messages.successMessages.getAllStates,
          schemes
        );
      } else {
        // Add Role Error Message
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  create: async (req, res) => {
    try {
      let user = await authUser.getUser(req, res);
      if(user.role.name == 'fa-admin') {
        const fa = await fundingAgencyModel.findOne({ admin: user._id });
        const schemes = await schemeModel.create({
          ...req.body,
          fundingAgency: fa._id,
          createdBy: user._id,
        });
        returnMessage.successMessage(
          res,
          messages.successMessages.addState,
          schemes
        );
      } else {
        // Add Error Handling
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  edit: async (req, res) => {
    try {
      let user = await authUser.getUser(req, res);
      if(user.role.name == 'fa-admin') {
        const fa = await fundingAgencyModel.findOne({ admin: user._id });
        const schemes = await schemeModel.findOne({ _id: req.params["id"] });
        if(schemes.fundingAgency == fa._id) {
          returnMessage.successMessage(
            res,
            messages.successMessages.showState,
            schemes
          );
        } else {
          // Error Handling
        }
      } else {
        // Error Handling
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  update: async (req, res) => {
    try {
      let user = await authUser.getUser(req, res);
      if(user.role.name == 'fa-admin') {
        const fa = await fundingAgencyModel.findOne({ admin: user._id });
        const schemes = await schemeModel.findOne({ _id: req.params["id"] });
        if(schemes.fundingAgency == fa._id) {
          const schemes = await schemeModel.findByIdAndUpdate(
            req.params["id"],
            { ...req.body, updatedBy: user._id },
            { new: true }
          );
          returnMessage.successMessage(
            res,
            messages.successMessages.showState,
            schemes
          );
        } else {
          // Error Handling
        }
      } else {
        // Error Handling
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  // delete: async (req, res) => {
  //   try {
  //     const schemes = await schemeModel.remove({ _id: req.params["id"] });
  //     returnMessage.successMessage(
  //       res,
  //       messages.successMessages.deleteState,
  //       schemes
  //     );
  //   } catch (error) {
  //     returnMessage.errorMessage(res, error);
  //   }
  // },
  show: async (req, res) => {
    try {
      let user = await authUser.getUser(req, res);
      if(user.role.name == 'super-admin') {
        const schemes = await schemeModel.findOne({ _id: req.params["id"] });
        returnMessage.successMessage(
          res,
          messages.successMessages.showState,
          schemes
        );
      } else if(user.role.name == 'fa-admin') {
        const schemes = await schemeModel.findOne({ _id: req.params["id"] });
        const fa = await fundingAgencyModel.findOne({ admin: user._id });
        if(schemes.fundingAgency == fa._id) {
          returnMessage.successMessage(
            res,
            messages.successMessages.showState,
            schemes
          );
        } else {
          // Error Handling
        }
      } else {
        // Error Handling
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
};
