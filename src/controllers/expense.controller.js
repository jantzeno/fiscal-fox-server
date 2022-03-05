import { ExpenseModel } from "../sequelize/models/expense.model.js";

export function getExpenses(req, res) {
  const msg = "Expense - Get All Expenses";
  console.log(msg);
  ExpenseModel.findAll()
    .then((expenses) => {
      let expenseRes = [];
      if (expenses) {
        for (const expense of expenses) {
          expenseRes.push({
            id: expense.id,
            budgetId: expense.budgetId,
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
}

export function getExpensesByBudgetId(req, res) {
  const msg = "Expense - Get All Expenses By Budget";
  console.log(msg);

  ExpenseModel.findAll({
    where: { budgetId: Number(req.params.budgetId) },
  })
    .then((expenses) => {
      let expenseRes = [];
      if (expenses) {
        for (const expense of expenses) {
          expenseRes.push({
            id: expense.id,
            budgetId: expense.budgetId,
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
}

export function getExpense(req, res) {
  const msg = "Expense - Get Expense";
  console.log(msg);
  const expenseId = req.params.expenseId;
  if (expenseId) {
    ExpenseModel.findByPk(expenseId)
      .then((expense) => {
        if (expense) {
          res.status(200).send({
            expense: {
              id: expense.id,
              budgetId: expense.budgetId,
              name: expense.name,
              amount: expense.amount,
            },
          });
        } else {
          res.status(204).send({ expense: null });
        }
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  }
}

export function createExpense(req, res) {
  const msg = "Expense - Create Expense";
  console.log(msg);
  ExpenseModel.create({
    name: req.body.name,
    budgetId: req.body.budgetId,
    amount: req.body.amount,
  })
    .then((expense) => {
      if (expense) {
        res.status(201).send({
          expense: {
            id: expense.id,
            budgetId: expense.budgetId,
            name: expense.name,
            amount: expense.amount,
          },
        });
      }
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
}

export function updateExpense(req, res) {
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
    .then(() => {
      ExpenseModel.findByPk(req.params.expenseId).then((expense) => {
        if (expense) {
          res.status(200).send({
            expense: {
              id: expense.id,
              budgetId: expense.budgetId,
              name: expense.name,
              amount: expense.amount,
            },
          });
        }
      });
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
}

export function deleteExpense(req, res) {
  const msg = "Expense - Delete Expense";
  console.log(msg);
  ExpenseModel.destroy({
    where: {
      id: req.params.expenseId,
    },
  })
    .then((status) => {
      console.log(status);
      res.status(200).send({ status });
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
}
