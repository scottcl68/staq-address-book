"use strict";
exports.__esModule = true;
exports.ContactCard = exports.Address = void 0;
var uuid_1 = require("uuid");
var Address = /** @class */ (function () {
    function Address() {
    }
    return Address;
}());
exports.Address = Address;
var ContactCard = /** @class */ (function () {
    function ContactCard() {
        this.key = (0, uuid_1.v4)();
    }
    return ContactCard;
}());
exports.ContactCard = ContactCard;
exports["default"] = ContactCard;
