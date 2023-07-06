const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      // primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      // validate: {
      //   notNull: {
      //     msg: "Nombre de usuario requerido",
      //   },
      //   notEmpty: {
      //     msg: "El nombre de usuario no puede estar vacio",
      //   },
      //   len: {
      //     args: [3 - 50],
      //     msg: "Debe ser mayor a 3 caracteres ",
      //   },
      // },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      // {
      //   msg: "El correo electronico ya esta en uso",
      // },
      // validate: {
      //   notNull: {
      //     msg: "El correo electronico requerido",
      //   },
      //   notEmpty: {
      //     msg: "El correo electronico no puede estar vacio",
      //   },
      //   isEmail: {
      //     msg: "Debe prporcionar un correo electronico valido",
      //   },
      //   isEmailCustom(value) {
      //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      //     if (!emailRegex.test(value)) {
      //       throw new Error("El formato del correo electrónico es inválido");
      //     }
      //   },
      // },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   notNull: {
      //     msg: "La contraseña es requerida",
      //   },
      //   notEmpty: {
      //     msg: "La contraseña no puede estar vacia",
      //   },
      //   len: {
      //     args: [8, 20],
      //     msg: "La contraseña debe tener entre 8 y 20 caracteres",
      //   },
      // },
    },
  });

  // User.addHook("beforeSave", async (user) => {
  //   if (user.changed("password")) {
  //     const salt = await bcrypt.genSalt(10);
  //     user.password = await bcrypt.hash(user.password, salt);
  //   }
  // });

  // User.prototype.comparePassword = function (password) {
  //   return bcrypt.compare(password, this.password);
  // };

  return User;
};
