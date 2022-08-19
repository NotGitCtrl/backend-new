const returnMessage = require("../message");
const messages = require("../../lang/messages.json");
const projectModel = require("../../schema/projects");
const fundingAgencyModel = require("../../schema/fundingAgency");
const heiModel = require("../../schema/hei");
const schemeModel = require("../../schema/schemes");
const authUser = require("../../utils/authUser");
const userDetails = require("../../utils/authUser");
module.exports = {
  index: async (req, res) => {
    try {
      const user = await userDetails.getUser(req,res);
      // console.log(user.role.name);
      if(user.role.name == 'super-admin') {
        const projects = await projectModel.find();
        returnMessage.successMessage(res,messages.successMessages.getAllStates,projects);
      }
      else if(user.role.name == 'fa-admin') {
        const fundingAgency = await fundingAgencyModel.find({ "admin": { $eq: user._id }});
        const projects = await projectModel.find({ "fundingAgency": { $eq: fundingAgency._id }});  
        returnMessage.successMessage(res,messages.successMessages.getAllStates,projects);
      }
      else if(user.role.name == 'hei-admin') {
        const hei = await heiModel.find({ "heiAdmin": { $eq: user._id }});
        const projects = await projectModel.find({ "fundingAgency": { $eq: hei._id }});
        returnMessage.successMessage(res,messages.successMessages.getAllStates,projects);
      }else if (user.role.name == 'fa-project-coordinator') {
        const projects = await projectModel.find({ "fundingAgencyCoordinator": { $eq: user._id }});
        returnMessage.successMessage(res,messages.successMessages.getAllStates,projects);
      }else if(user.role.name == 'hei-project-coordinator') {
        const projects = await projectModel.find({ "heiCoordinator": { $eq: user._id }});
        returnMessage.successMessage(res,messages.successMessages.getAllStates,projects);
      }
      else {
        returnMessage.errorMessage(res,messages.errorMessages.incorrectRole);
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  create: async (req, res) => {
    try {
      let user = await authUser.getUser(req, res);
      if(user.role.name == 'fa-admin'){
        const fa = await fundingAgencyModel.findOne({ admin: user._id })
        const projects = await projectModel.create({
          ...req.body,
          fundingAgency: fa._id,
          createdBy: user._id,
        });
        returnMessage.successMessage(res,messages.successMessages.addState,projects);
      } else {
        returnMessage.errorMessage(res,messages.errorMessages.incorrectRole);
      }
      
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  edit: async (req, res) => {
    try {
      let user = await authUser.getUser(req, res);  
      const project = await projectModel.findOne({ _id: req.params["id"] });
      const fundingAgency = await fundingAgencyModel.find({ "admin": { $eq: user._id }});
      if(user.role.name == 'fa-admin' && fundingAgency._id == project.fundingAgency) {
        returnMessage.successMessage(res,messages.successMessages.showState,project);
      } else {
        returnMessage.errorMessage(res,messages.errorMessages.incorrectRole);
      }
      
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  update: async (req, res) => {
    try {
      let user = await authUser.getUser(req, res);
      const project = await projectModel.findOne({ _id: req.params["id"] });
      const fundingAgency = await fundingAgencyModel.find({ "admin": { $eq: user._id }});
      if(user.role.name == 'fa-admin' && fundingAgency._id == project.fundingAgency) {
        const project = await projectModel.findByIdAndUpdate(
          req.params["id"],
          { ...req.body, updatedBy: user._id },
          { new: true }
        );
        returnMessage.successMessage(res,messages.successMessages.showState,project);
      } else {
        returnMessage.errorMessage(res,messages.errorMessages.incorrectRole);
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  // delete: async (req, res) => {
  //   try {
  //     const project = await projectModel.remove({ _id: req.params["id"] });
  //     returnMessage.successMessage(
  //       res,
  //       messages.successMessages.deleteState,
  //       project
  //     );
  //   } catch (error) {
  //     returnMessage.errorMessage(res, error);
  //   }
  // },
  show: async (req, res) => {
    try {
      let user = await authUser.getUser(req, res);
      const project = await projectModel.findOne({ _id: req.params["id"] });
      if(user.role.name == 'fa-admin') {
        const fundingAgency = await fundingAgencyModel.find({ "admin": { $eq: user._id }});
        if(fundingAgency._id == project.fundingAgency) {
          returnMessage.successMessage(res,messages.successMessages.showState,project);
        }
      } else if(user.role.name == 'hei-admin') {
        const hei = await heiModel.find({ "heiAdmin": { $eq: user._id }});
        if(hei._id == project.hei) {
          returnMessage.successMessage(res,messages.successMessages.showState,project);
        }
      } else if(user.role.name == 'fa-project-coordinator') {
        if(project.fundingAgencyCoordinator.includes(user._id)) {
          returnMessage.successMessage(res,messages.successMessages.showState,project);
        }
      } else  {
        // Add Later
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
};
