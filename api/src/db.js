require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
// let entries = Object.entries(sequelize.models);
// let capsEntries = entries.map((entry) => [
//   entry[0][0].toUpperCase() + entry[0].slice(1),
//   entry[1],
// ]);
// sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const { Activities, Goals, Classes, Coaches, Events, users, Orders, Reviews } =
  sequelize.models;

// Aca vendrian las relaciones
Activities.belongsToMany(Goals, { through: "Activities_Goals" });
Goals.belongsToMany(Activities, { through: "Activities_Goals" });

Activities.hasMany(Classes);
Classes.belongsTo(Activities);

Coaches.hasMany(Classes);
Classes.belongsTo(Coaches);

Activities.belongsToMany(Coaches, { through: "Activities_Coaches" });
Coaches.belongsToMany(Activities, { through: "Activities_Coaches" });

Classes.hasMany(Events);
Events.belongsTo(Classes);

Events.belongsToMany(users, { through: "Events_Users" });
users.belongsToMany(Events, { through: "Events_Users" });

users.hasMany(Orders);
Orders.belongsTo(users);

users.hasMany(Reviews);
Reviews.belongsTo(users);

Events.hasMany(Reviews);
Reviews.belongsTo(Events);

Coaches.hasMany(Reviews);
Reviews.belongsTo(Coaches);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importar la conexión { conn } = require('./db.js');
};
