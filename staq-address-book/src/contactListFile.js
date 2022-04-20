"use strict";
exports.__esModule = true;
exports.contacts = exports.getRandomContacts = void 0;
var names_1 = require("./names");
var classes_1 = require("./classes");
var uuid_1 = require("uuid");
function getRandomContacts(num) {
    //initialize contact container
    var contacts = [];
    //generate 'num' new contact cards with first and sur names only
    for (var i = 0; i < num; i++) {
        var firstName = names_1.firstNames[Math.floor(Math.random() * names_1.firstNames.length)];
        var lastName = names_1.surNames[Math.floor(Math.random() * names_1.surNames.length)];
        var email = lastName.toLowerCase() + "." + firstName.toLowerCase() + Math.floor(Math.random() * 1000) + "@gmail.com";
        var contact = new classes_1["default"]();
        contact.firstName = firstName;
        contact.lastName = lastName;
        contact.email = email;
        contact.uuid = (0, uuid_1.v4)();
        //add new random contact to contact container
        contacts.push(contact);
    }
    return contacts;
}
exports.getRandomContacts = getRandomContacts;
exports.contacts = getRandomContacts(50);
require('fs').writeFile('./contactList.json', JSON.stringify(exports.contacts), function (err) {
    if (err) {
        console.error('Crap happens');
    }
});
