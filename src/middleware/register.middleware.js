import { UserModel } from "../sequelize/models/user.model.js";

export function checkDuplicateUserName(req, res, next) {
  console.log("Register - Check Username");
  // -> Check for duplicate username
  UserModel.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send("Error: Username in use!");
      res.end;
    } else {
      next();
    }
  });
}

export function checkDuplicateEmail(req, res, next) {
  console.log("Register - Check Email");
  // -> Check for duplicate email
  UserModel.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send("Error: Email in use!");
      res.end;
    } else {
      next();
    }
  });
}
