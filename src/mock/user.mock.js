const { ROLES } = require("../constants");

const firstNames = [
    "Ana",
    "Luis",
    "Carlos",
    "María",
    "Sofía",
    "Juan",
    "Laura",
    "Martín"
];

const lastNames = [
    "Pérez",
    "Gómez",
    "Rodríguez",
    "Fernández",
    "López",
    "Martínez",
    "García",
    "Sánchez"
];

const getRandomItem = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};

const generateUser = (role = ROLES.USER) => {
    const firstName = getRandomItem(firstNames);
    const lastName = getRandomItem(lastNames);

    return {
        name: `${firstName} ${lastName}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${Date.now()}${Math.floor(Math.random() * 10000)}@test.com`,
        role
    };
};

const generateUsers = (qty = 1, role = ROLES.USER) => {
    return Array.from({ length: qty }, () => generateUser(role));
};

module.exports = {
    generateUser,
    generateUsers
};