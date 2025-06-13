const User = require("../models/user.models.js")
const Income = require("../models/income.models.js")
const xlsx = require("xlsx")
// add income 
exports.addIncome = async (req,res) =>{
    const userId = req.user.id;

    console.log("User id",userId)

    try {
        const {icon,source,amount,date} = req.body;
        // console.log(req.body)

        if(!source || !amount || !date)
            return res.status(400).json({message:"All fields are required"})

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });

        // console.log("Income",newIncome)
        await newIncome.save();
        console.log("Income added successfully")
        return res.status(200).json({newIncome})
    } catch (error) {
        console.log("Not able to add income")
        return res.status(500).json({error:error.message})
    }
}

//get all income
exports.getAllIncome = async (req,res) => {
    const userId = req.user.id;

    try {

        const income = await Income.find({userId}).sort({date: -1});
        res.json(income);
        
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}

//dowanload excel
exports.downloadIncomeExcel = async (req,res) =>{
    const userId = req.user.id;

    try {
        const income = await Income.find({userId}).sort({date: -1});

        console.log("download income details",income);

        //prepare data for excel
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date
        }))

        const wb = xlsx.utils.book_new()
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb,ws,"Income");
        xlsx.writeFile(wb,'Income_details.xlsx');

        res.download('Income_details.xlsx');
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

//delete income
exports.deleteIncome = async (req,res) =>{

    try {
        console.log("Received ID for deletion:", req.params.id);
        const deletedIncome = await Income.findByIdAndDelete(req.params.id);

        console.log("Deleted income",deletedIncome)
        res.json({message:"Income deleted successfully"}) // 
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}