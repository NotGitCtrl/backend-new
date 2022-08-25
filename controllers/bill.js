const messages = require("../lang/messages.json");
const returnMessage = require("./message");
const authUser = require("../utils/authUser");
const billModel = require("../schema/bill");

module.exports = {
  index: async (req, res) => {
    try {
      const bills = await billModel.find({});
      returnMessage.successMessage(
        res,
        messages.successMessages.getAllCountries,
        bills
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  create: async (req, res) => {
    try {
      if (req.user.role.name == "hei-admin") {
        const {name} = req.body;
        const isNameTaken = await billModel.findOne({name});
        if (isNameTaken)
          returnMessage.errorMessage(
            res,
            messages.errorMessages.countryAlreadyExists
          );

        let user = await authUser.getUser(req, res);
        const bill = await billModel.create({
          ...req.body,
          createdBy: user._id,
        });
        returnMessage.successMessage(
          res,
          messages.successMessages.addCountry,
          bill
        );
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  edit: async (req, res) => {
    try {
      if (req.user.role.name == "hei-admin") {
        const bill = await billModel.findOne({
          _id: req.params["id"],
        });
        returnMessage.successMessage(
          res,
          messages.successMessages.showCountry,
          bill
        );
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  update: async (req, res) => {
    try {
      if (req.user.role.name == "hei-admin") {
        let user = await authUser.getUser(req, res);
        const bill = await billModel.findByIdAndUpdate(req.params["id"], {
          ...req.body,
          isApproved: false,
          updatedBy: user._id,
        });
        returnMessage.successMessage(
          res,
          messages.successMessages.updateCountry,
          bill
        );
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  approve: async (req, res) => {
    try {
      if (req.user.role.name == "hei-admin") {
        let user = await authUser.getUser(req, res);
        const bill = await billModel.findByIdAndUpdate(req.params["id"], {
          ...req.body,
          isApproved: true,
          approvedBy: user._id,
        });
        returnMessage.successMessage(
          res,
          messages.successMessages.updateCountry,
          bill
        );
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  delete: async (req, res) => {
    try {
      const bill = await billModel.remove({
        _id: req.params["id"],
      });
      returnMessage.successMessage(res, messages.successMessages.deleteCountry);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  show: async (req, res) => {
    try {
      const bill = await billModel.findOne({
        _id: req.params["id"],
      });
      returnMessage.successMessage(
        res,
        messages.successMessages.showCountry,
        bill
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
};
