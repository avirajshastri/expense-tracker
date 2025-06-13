
const Expense = require("../models/expense.models.js")
const xlsx = require("xlsx")
// add expense
exports.addExpense = async (req,res) =>{
    const userId = req.user.id;

    console.log("User id",userId)

    try {
        const {icon,category,amount,date} = req.body;
        // console.log(req.body)

        if(!category || !amount || !date)
            return res.status(400).json({message:"All fields are required"})

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });

        // console.log("Expense",newExpense)
        await newExpense.save();
        console.log("Expense added successfully")
        return res.status(200).json({newExpense})
    } catch (error) {
        console.log("Not able to add expense")
        return res.status(500).json({error:error.message})
    }
}

//get all Expense
exports.getAllExpense = async (req,res) => {
    const userId = req.user.id;

    try {

        const expense = await Expense.find({userId}).sort({date: -1});
        res.json(expense);
        
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}

//dowanload excel
exports.downloadExpenseExcel = async (req,res) =>{
    const userId = req.user.id;

    try {
        const expense = await Expense.find({userId}).sort({date: -1});

        console.log("download expense details",expense);

        //prepare data for excel
        const data = expense.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date
        }))

        const wb = xlsx.utils.book_new()
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb,ws,"Expense");
        xlsx.writeFile(wb,'Expense_details.xlsx');

        res.download('Expense_details.xlsx');
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

//delete Expense
exports.deleteExpense = async (req,res) =>{

    try {
        console.log("Received ID for deletion:", req.params.id);
        const deletedExpense = await Expense.findByIdAndDelete(req.params.id);

        console.log("Deleted expnese",deletedExpense)
        res.json({message:"Expense deleted successfully"}) // 
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}