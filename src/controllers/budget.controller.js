const { BudgetModel } = require("../sequelize/models/budget.model.js");
const { validationResult } = require("express-validator");

exports.getAllBudgets = (req, res) => {
  const msg = "Budget - Get All Budgets";
  console.log(msg);

  BudgetModel.findAll()
    .then((budgets) => {
      let budgetRes = [];
      if (budgets) {
        for (budget of budgets) {
          budgetRes.push({
            id: budget.id,
            name: budget.name,
            amount: budget.amount,
          });
        }

        res.status(200).send({ budgets: budgetRes });
      } else {
        res.status(204).send({ budgets: [] });
      }
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};

exports.getBudget = (req, res) => {
  const msg = "Budget - Get Budget";
  console.log(msg);
  const budgetId = Number(req.params.budgetId);
  if (budgetId) {
    BudgetModel.findByPk(budgetId)
      .then((budget) => {
        if (budget) {
          res
            .status(200)
            .send({ id: budget.id, name: budget.name, amount: budget.amount });
        } else {
          res.status(204).send({ budget: null });
        }
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  }
};

exports.createBudget = (req, res) => {
  const msg = "Budget - Create Budget";
  console.log(msg);
  BudgetModel.create({
    name: req.body.name,
    amount: req.body.amount,
  })
    .then((budget) => {
      if (budget) {
        res
          .status(201)
          .send({ id: budget.id, name: budget.name, amount: budget.amount });
      }
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};

exports.updateBudget = (req, res) => {
  const msg = "Budget - Update Budget";
  console.log(msg);
  BudgetModel.update(
    {
      name: req.body.name,
      amount: req.body.amount,
    },
    {
      where: {
        id: Number(req.params.budgetId),
      },
    }
  )
    .then((budget) => {
      if (budget) {
        res
          .status(200)
          .send({ id: budget.id, name: budget.name, amount: budget.amount });
      }
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};

exports.deleteBudget = (req, res) => {
  const msg = "Budget - Delete Budget";
  console.log(msg);
  BudgetModel.destroy({
    where: {
      id: Number(req.params.budgetId),
    },
  })
    .then((status) => {
      res.status(200).send({ status });
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};
