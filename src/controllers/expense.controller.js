const { ExpenseModel } = require("../sequelize/models/expense.model.js");
const { validationResult } = require("express-validator");

exports.getAllExpenses = (req, res) => {
  const msg = "Expense - Get All Expenses";
  console.log(msg);

  ExpenseModel.findAll()
    .then((expenses) => {
      let expenseRes = [];
      if (expenses) {
        for (expense of expenses) {
          expenseRes.push({
            id: expense.id,
            budgetId: expense.budget_id,
            name: expense.name,
            amount: expense.amount,
          });
        }

        res.status(200).send({ expenses: expenseRes });
      } else {
        res.status(204).send({ expenses: [] });
      }
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};

exports.getAllExpensesByBudget = (req, res) => {
  const msg = "Expense - Get All Expenses By Budget";
  console.log(msg);

  ExpenseModel.findAll({
    where: { budget_id: Number(req.params.budgetId) },
  })
    .then((expenses) => {
      let expenseRes = [];
      if (expenses) {
        for (expense of expenses) {
          expenseRes.push({
            id: expense.id,
            budgetId: expense.budget_id,
            name: expense.name,
            amount: expense.amount,
          });
        }
        res.status(200).send({ expenses: expenseRes });
      } else {
        res.status(204).send({ expenses: [] });
      }
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};

exports.getExpense = (req, res) => {
  const msg = "Expense - Get Expense";
  console.log(msg);
  const expenseId = req.params.expenseId;
  if (expenseId) {
    ExpenseModel.findByPk(expenseId)
      .then((expense) => {
        if (expense) {
          res.status(200).send({
            id: expense.id,
            budgetId: expense.budget_id,
            name: expense.name,
            amount: expense.amount,
          });
        } else {
          res.status(204).send({ expense: null });
        }
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  }
};

exports.createExpense = (req, res) => {
  const msg = "Expense - Create Expense";
  console.log(msg);
  ExpenseModel.create({
    name: req.body.name,
    amount: req.body.amount,
  })
    .then((expense) => {
      if (expense) {
        res.status(201).send({
          id: expense.id,
          budgetId: expense.budget_id,
          name: expense.name,
          amount: expense.amount,
        });
      }
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};

exports.updateExpense = (req, res) => {
  const msg = "Expense - Update Expense";
  console.log(msg);
  ExpenseModel.update(
    {
      name: req.body.name,
      amount: req.body.amount,
    },
    {
      where: {
        id: req.params.expenseId,
      },
    }
  )
    .then((expense) => {
      if (expense) {
        res
          .status(200)
          .send({
            id: expense.id,
            budgetId: expense.budget_id,
            name: expense.name,
            amount: expense.amount,
          });
      }
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};

exports.deleteExpense = (req, res) => {
  const msg = "Expense - Delete Expense";
  console.log(msg);
  ExpenseModel.destroy({
    where: {
      id: req.params.expenseId,
    },
  })
    .then((status) => {
      res.status(200).send({ status });
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};
