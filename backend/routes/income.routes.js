const express = require("express")

const  {
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel
} = require("../controllers/income.controller.js");

const {protect} = require("../middleware/auth.middleware.js");

const router = express.Router();

router.post("/add",protect,addIncome)
router.get("/get",protect,getAllIncome)
router.get("/downloadExcel",protect,downloadIncomeExcel)
router.delete("/:id",protect,deleteIncome);

module.exports = router;