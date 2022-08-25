const returnMessage = require("../message");
const messages = require("../../lang/messages.json");
const projectModel = require("../../schema/projects");
const fundingAgencyModel = require("../../schema/fundingAgency");
const heiModel = require("../../schema/hei");
const schemeModel = require("../../schema/schemes");
const authUser = require("../../utils/authUser");
const userDetails = require("../../utils/authUser");

const projectPopulate = [
  {
    path: 'scheme',
    select: ['name'],
  },
  {
    path: 'hei',
    select: ['name'],
  },
  {
    path: 'fundingAgency',
    select: ['name'],
  },
  {
    path: 'updatedBy',
    select: ['name'],
  },
]

module.exports = {
  index: async (req, res) => {
    try {
      const user = await userDetails.getUser(req,res);
      console.log(user.role.name);
      if(user.role.name == 'super-admin') {
        const projects = await projectModel.find().populate(projectPopulate);
        returnMessage.successMessage(res,messages.successMessages.getAllStates,projects);
      }
      else if(user.role.name == 'fa-admin') {
        const fundingAgency = await fundingAgencyModel.findOne({ "admin": { $eq: user._id }});
        const projects = await projectModel.find({ "fundingAgency": { $eq: fundingAgency._id }}).populate(projectPopulate);  
        returnMessage.successMessage(res,messages.successMessages.getAllStates,projects);
      }
      else if(user.role.name == 'hei-admin') {
        const hei = await heiModel.findOne({ "heiAdmin": { $eq: user._id }});
        const projects = await projectModel.find({ "hei": { $eq: hei._id }}).populate(projectPopulate);
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
      const hei = await heiModel.findOne({ "heiAdmin": { $eq: user._id }});
      const projects = await projectModel.create({
          ...req.body,
          hei: hei._id,
          createdBy: user._id,
          status: "Pending",
        });
        returnMessage.successMessage(res,messages.successMessages.addState,projects);    
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  edit: async (req, res) => {
    try {
      let user = await authUser.getUser(req, res);  
      const project = await projectModel.findOne({ _id: req.params["id"] });
      const hei = await heiModel.findOne({ "heiAdmin": { $eq: user._id }});
      if(req.user.role.name == 'hei-admin' && hei._id.equals(project.hei)) {
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
      const hei = await heiModel.findOne({ "heiAdmin": { $eq: user._id }});
      if(req.user.role.name == 'hei-admin' && hei._id.equals(project.hei)) {
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
      const user = await userDetails.getUser(req,res);
      const project = await projectModel.findOne({ _id: req.params["id"] });
      console.log(user.role.name)
      if(user.role.name == 'fa-admin') {
        const fundingAgency = await fundingAgencyModel.findOne({ "admin": { $eq: user._id }});
        if(fundingAgency._id.equals(project.fundingAgency)){
          returnMessage.successMessage(res,messages.successMessages.showState,project);
        }
      } else if(user.role.name == 'hei-admin') {
          returnMessage.successMessage(res,messages.successMessages.showState,project);
      } else if(user.role.name == 'fa-project-coordinator') {
        if(project.fundingAgencyCoordinator.includes(user._id)) {
          returnMessage.successMessage(res,messages.successMessages.showState,project);
        }
      } else if((user.role.name == 'super-admin') || (user.role.name == 'ugc-admin')) {
        returnMessage.successMessage(res,messages.successMessages.showState,project);
      } else {
        // Add Later
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },

  getProjectsAccToProposal: async(req,res) => {
    try {
      const projects = await projectModel.find({ projectProposal: req.params.id });
      returnMessage(res, messages.successMessages.addCountry, projects);
    } catch(error) {
      // error handling
    }
  },
  approveProject: async(req,res) => {
    try {
      if(req.user.role.name == 'fa-admin') {
        const fundingAgency = await fundingAgencyModel.findOne({ "admin": { $eq: user._id }});
        const project = await projectModel.find({ _id: req.params.projectId });
        if(fundingAgency._id.equals(project.fundingAgency)) {
          await project.update({ status: "Approved" });
          returnMessage(res, messages.successMessages.addCountry, project);
        } else {
          // Error Handling
        }
      } else {
        // Error Handling
      }
    } catch(error) {
      console.log(error);
    }
  },

  getProjectCoordinators: async(req,res) => {
    try {
      if(req.user.role.name == 'fa-admin') {
        const fundingAgency = await fundingAgencyModel.findOne({ "admin": { $eq: user._id }});
        let projects = await projectModel.find({ "fundingAgency": fundingAgency._id}).populate({ path: "fundingAgencyCoordinator",
        select: ["name"]});
        returnMessage.successMessage(res,messages.successMessages.showState,projects);
      } else if(req.user.role.name == 'hei-admin') {
        const hei = await heiModel.find({ "heiAdmin": { $eq: user._id }});
        const projects = await projectModel.find({ "hei": { $eq: hei._id }}).populate({ path: "fundingAgencyCoordinator",
        select: ["name"]});
        returnMessage.successMessage(res,messages.successMessages.getAllStates,projects);
      } else {
        returnMessage.errorMessage(res,messages.errorMessages.incorrectRole);
      }
    } catch(error) {
      returnMessage.errorMessage(res,error);
    }
  },
};
