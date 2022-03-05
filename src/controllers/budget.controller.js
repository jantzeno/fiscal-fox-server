import { BudgetModel } from "../sequelize/models/budget.model.js";

export function getBudgets(req, res) {
  const msg = "Budget - Get All Budgets";
  console.log(msg);
  BudgetModel.findAll()
    .then((budgets) => {
      let budgetRes = [];
      if (budgets) {
        for (const budget of budgets) {
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
}

export function getBudget(req, res) {
  const msg = "Budget - Get Budget";
  console.log(msg);
  const budgetId = Number(req.params.budgetId);
  if (budgetId) {
    BudgetModel.findByPk(budgetId)
      .then((budget) => {
        if (budget) {
          res.status(200).send({
            budget: {
              id: budget.id,
              name: budget.name,
              amount: budget.amount,
            },
          });
        } else {
          res.status(204).send({ budget: null });
        }
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } else {
    res.status(400).send();
  }
}

export function createBudget(req, res) {
  const msg = "Budget - Create Budget";
  console.log(msg);
  BudgetModel.create({
    name: req.body.name,
    amount: req.body.amount,
  })
    .then((budget) => {
      if (budget) {
        res.status(201).send({
          budget: {
            id: budget.id,
            name: budget.name,
            amount: budget.amount,
          },
        });
      }
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
}

export function updateBudget(req, res) {
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
        res.status(200).send({
          budget: {
            id: budget.id,
            name: budget.name,
            amount: budget.amount,
          },
        });
      }
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
}

export function deleteBudget(req, res) {
  const msg = "Budget - Delete Budget";
  console.log(msg);
  BudgetModel.destroy({
    where: {
      id: Number(req.params.budgetId),
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
