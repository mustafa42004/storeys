const factoryController = require("./factoryController");
const contactModel = require("../models/Contact");

module.exports.createContact = factoryController.createDoc(contactModel);

module.exports.getAllContacts = factoryController.getAllDocs(contactModel);

module.exports.getContact = factoryController.getDoc(contactModel);

module.exports.updateContact = factoryController.updateDoc(contactModel);

module.exports.deleteContact = factoryController.deleteDoc(contactModel);
