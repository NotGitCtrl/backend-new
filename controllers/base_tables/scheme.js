const fundingAgencyModel = require("../../schema/fundingAgency");
const schemeModel = require("../../schema/schemes");
const returnMessage = require("../message");
const messages = require("../../lang/messages.json");

module.exports = {
  index: async(req,res) => {
    try {
      const schemes = await schemeModel.find();
      returnMessage.successMessage(res,messages.successMessages.getAllStates,schemes);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },
  create: async (req, res) => {
    try {
      const { name } = req.body;
      const isNameTaken = await schemeModel.findOne({ name });
      if (isNameTaken)
        returnMessage.errorMessage(res,messages.errorMessages.stateAlreadyExists)

      let user = await authUser.getUser(req,res);
      const fa = await fundingAgencyModel.findOne({admin: user._id })
      const schemes = await schemeModel.create({ ...req.body, fundingAgency: fa._id });
      returnMessage.successMessage(res,messages.successMessages.addState,schemes);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },
  edit: async(req,res) => {
    try {
      const schemes = await schemeModel.findOne({_id: req.params['id'] })
      returnMessage.successMessage(res,messages.successMessages.showState, schemes);
    } catch(error) {
      returnMessage.errorMessage(res,error);
    }
  },
  update: async(req,res) => {
    try {
      const schemes = await schemeModel.findByIdAndUpdate(req.params['id'], { ...req.body }, {new: true});
      returnMessage.successMessage(res,messages.successMessages.updateState, schemes);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },
  delete: async(req,res) => {
    try {
      const schemes = await schemeModel.remove({ '_id': req.params['id'] });
      returnMessage.successMessage(res,messages.successMessages.deleteState, schemes);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },
  show: async(req,res) => {
    try {
      const schemes = await schemeModel.findOne({_id: req.params['id'] })
      returnMessage.successMessage(res,messages.successMessages.showState, schemes);
    } catch(error) {
      returnMessage.errorMessage(res,error);
    }
  }
};
