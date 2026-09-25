const { ROLES } = require("../constants");
const { generateUsers } = require("./user.mock");

const generateDrivers = (qty = 1) => {
    return generateUsers(qty, ROLES.DRIVER);
};

module.exports = {
    generateDrivers
};