import { UserModel } from "../sequelize/models/user.model.js";

export function getUser(req, res) {
  const msg = "User - Get User";
  console.log(msg);
  const userId = Number(req.userId);
  if (userId) {
    UserModel.findByPk(userId)
      .then((user) => {
        if (user) {
          // Filter out password
          user.password = undefined;
          res.status(200).send({
            username: user.username,
            email: user.email,
            role: user.role,
          });
        } else {
          res.status(204).send({ user: null });
        }
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  }
}

export function updateUser(req, res) {
  const msg = "User - Update User";
  console.log(msg);
  UserModel.update(
    {
      username: req.body.username,
      email: req.body.email,
      role: req.body.role,
    },
    {
      where: {
        id: Number(req.userId),
      },
    }
  )
    .then((user) => {
      if (user) {
        // Filter out password
        user.password = undefined;
        res.status(200).send({
          user: {
            username: user.username,
            email: user.email,
            role: user.role,
          },
        });
      }
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
}

export function updatePassword(req, res) {
  const msg = "User - Update Password";
  console.log(msg);
  UserModel.update(
    {
      password: req.params.newPassword,
    },
    {
      where: {
        id: Number(req.userId),
      },
    }
  )
    .then((user) => {
      if (user) {
        // Filter out password
        user.password = undefined;
        res.status(200).send({
          user: {
            username: user.username,
            email: user.email,
            role: user.role,
          },
        });
      }
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
}

export function deleteUser(req, res) {
  const msg = "User - Delete User";
  console.log(msg);
  UserModel.destroy({
    where: {
      id: Number(req.userId),
    },
  })
    .then((status) => {
      res.status(200).send({ status });
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
}
