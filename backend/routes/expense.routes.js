const express = require("express")

const  {
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExcel
} = require("../controllers/expense.controller.js");

const {protect} = require("../middleware/auth.middleware.js");

const router = express.Router();

router.post("/add",protect,addExpense)
router.get("/get",protect,getAllExpense)
router.get("/downloadExcel",protect,downloadExpenseExcel)
router.delete("/:id",protect,deleteExpense);

module.exports = router;