const express = require("express");
const Expense = require("../models/Expense");
const auth = require("../middleware/auth");

const router = express.Router();

//Crear un gasto
router.post("/new", auth, async (req, res) => {
  const { title, amount, date, category } = req.body;
  try {
    const expense = new Expense({
      title,
      amount,
      date: date || Date.now(),
      category,
      user: req.user.id,
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

//Listar los gastos

//Actualizar un gasto

//Eliminar un gasto

module.exports = router;
