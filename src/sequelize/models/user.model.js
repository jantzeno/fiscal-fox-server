import { DataTypes } from "sequelize";
import { hashSync, compareSync } from "bcrypt";
const saltRounds = 10;
import { connection } from "../../config/db.config.js";

export const UserModel = connection.define(
  "user",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    username: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(60),
      validate: {
        // usernames must have length of at least 3, and
        // only use letters, numbers and underscores.
        is: /^\w{3,}$/,
      },
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING(70).BINARY,
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(60),
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING(60),
    },
  },
  {
    // Hash password before saving to database
    hooks: {
      beforeCreate: (user) => {
        user.password = hashSync(user.password, saltRounds);
      },
    },
    // Helper to validate the password
    instanceMethods: {
      validPassword: function (password) {
        return compareSync(password, this.password);
      },
    },
  }
);
