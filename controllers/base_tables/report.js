const returnMessage = require("../message");
const messages = require("../../lang/messages.json");
const reportModel = require("../../schema/reports");
const authUser = require("../../utils/authUser");

module.exports = {
  index: async (req, res) => {
    try {
      const reports = await reportModel.find({ project: req.params["id"] });
      returnMessage.successMessage(
        res,
        messages.successMessages.getAllStates,
        reports
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  create: async (req, res) => {
    try {
      if (req.user.role.name == "super-admin") {
        const { name } = req.body;
        const isNameTaken = await reportModel.findOne({ name });
        if (isNameTaken)
          returnMessage.errorMessage(
            res,
            messages.errorMessages.stateAlreadyExists
          );

        let user = await authUser.getUser(req, res);
        const reports = await reportModel.create({
          ...req.body,
          isHeiApproved: false,
          isFaApproved: false,
          createdBy: user._id,
        });

        returnMessage.successMessage(
          res,
          messages.successMessages.addState,
          reports
        );
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  edit: async (req, res) => {
    try {
      if (req.user.role.name == "super-admin") {
        const report = await reportModel.findOne({ _id: req.params["id"] });
        returnMessage.successMessage(
          res,
          messages.successMessages.showState,
          report
        );
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  update: async (req, res) => {
    try {
      if (req.user.role.name == "super-admin") {
        let user = await authUser.getUser(req, res);
        const reports = await reportModel.findByIdAndUpdate(
          req.params["id"],
          { ...req.body, updatedBy: user._id },
          { new: true }
        );
        returnMessage.successMessage(
          res,
          messages.successMessages.updateState,
          reports
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
        const report = await reportModel.findByIdAndUpdate(req.params["id"], {
          ...req.body,
          isHeiApproved: true,
          approvedByHei: user._id,
        });
        returnMessage.successMessage(
          res,
          messages.successMessages.updateCountry,
          report
        );
      }
      else if (req.user.role.name == "fa-admin") {
        let user = await authUser.getUser(req, res);
        const isHeiApproved = await reportModel.findById(req.params["id"]);
        if(isHeiApproved.isHeiApproved){
          const report = await reportModel.findByIdAndUpdate(req.params["id"], {
            ...req.body,
            isFaApproved: true,
            approvedByFa: user._id,
          });
          returnMessage.successMessage(
            res,
            messages.successMessages.updateCountry,
            report
          );
        }
        else{
          returnMessage.errorMessage(res, "Not Approved by HEI");
        }
        
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  delete: async (req, res) => {
    try {
      const report = await reportModel.remove({ _id: req.params["id"] });
      returnMessage.successMessage(
        res,
        messages.successMessages.deleteState,
        report
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  show: async (req, res) => {
    try {
      const report = await reportModel.findOne({
        _id: req.params["id"],
      });
      returnMessage.successMessage(
        res,
        messages.successMessages.showState,
        report
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
};
