"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize = new sequelize_typescript_1.Sequelize({
    database: process.env.DB_NAME,
    dialect: 'mssql',
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    models: [__dirname + "/models"]
});
sequelize.authenticate()
    .then(() => {
    console.log('connected');
})
    .catch((error) => {
    console.log(error);
});
sequelize.sync({ force: false }).then(() => {
    console.log('synced !!!');
});
exports.default = sequelize;
