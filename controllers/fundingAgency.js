const fundingAgencyModel = require("../../schema/fundingAgency");
const returnMessage = require("../message");
const messages = require("../../lang/messages.json");

module.exports = {
  index: async(req,res) => {
    try {
      const fundingAgencies = await fundingAgencyModel.find({});
      returnMessage.successMessage(res,messages.successMessages.getAllCountries,fundingAgencies);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },
  create: async (req, res) => {
    try {
      const { name } = req.body;
      const isNameTaken = await fundingAgencyModel.findOne({ name });
      if (isNameTaken)
        returnMessage.errorMessage(res,messages.errorMessages.countryAlreadyExists)

      const fundingAgency = await fundingAgencyModel.create({ ...req.body });
      returnMessage.successMessage(res,messages.successMessages.addCountry,fundingAgency);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },
  edit: async(req,res) => {
    try {
      const fundingAgency = await fundingAgencyModel.findOne({_id: req.params['id'] })
      returnMessage.successMessage(res,messages.successMessages.showCountry, fundingAgency);
    } catch(error) {
      returnMessage.errorMessage(res,error);
    }
  },
  update: async(req,res) => {
    try {
      const fundingAgency = await fundingAgencyModel.findByIdAndUpdate(req.params['id'], { ...req.body });
      returnMessage.successMessage(res,messages.successMessages.updateCountry, fundingAgency);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },
  delete: async(req,res) => {
    try {
      const fundingAgency = await fundingAgencyModel.remove({ '_id': req.params['id'] });
      returnMessage.successMessage(res,messages.successMessages.deleteCountry);
    } catch (error) {
      returnMessage.errorMessage(res,error);
    }
  },
  show: async(req,res) => {
    try {
      const fundingAgency = await fundingAgencyModel.findOne({_id: req.params['id'] })
      returnMessage.successMessage(res,messages.successMessages.showCountry, fundingAgency);
    } catch(error) {
      returnMessage.errorMessage(res,error);
    }
  }
};
