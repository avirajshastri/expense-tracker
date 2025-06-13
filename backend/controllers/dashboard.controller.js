const Income = require("../models/income.models");
const Expense = require("../models/expense.models");
const {isValidObjectId, Types} = require("mongoose");

//dashboard data
exports.getDashboardData = async(req,res) =>{
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));

        //fetch total income and expenses

        const totalIncome = await Income.aggregate([
            {$match: {userId: userObjectId}},
            {$group: {_id:null,total: {$sum:"$amount"}}},
        ])

        console.log("total income",{totalIncome, userId: isValidObjectId(userId)})

        const totalExpense = await Expense.aggregate([
            {$match: {userId: userObjectId}},
            {$group: {_id:null, total:{$sum:"$amount"}}},
        ])

        console.log("Total expense",{totalExpense, userId: isValidObjectId(userId)})
        //get income transactions in last 60 days
        const last60DaysIncomeTransactions = await Income.find({
            userId,
            date: {$gte: new Date (Date.now() - 60*24*60*60*1000)}
        }).sort({date: -1});

        //get total income for last 60 days

        const totalIncomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum,transaction) => sum+transaction.amount, 0
        )

        //get expense transactions in last 30 days
        const last30DaysExpenseTransactions = await Expense.find({
            userId,
            date: {$gte: new Date (Date.now() - 30*24*60*60*1000)},
        }).sort({date:-1})

        //get total expense for last 30 days
        const totalExpenseLast30Days = last30DaysExpenseTransactions.reduce((sum,transaction)=>sum+transaction.amount,0)


        //fetch last 5 transactions (income+expense)

        const lastFiveTransactions = [
            ...(await Income.find({userId}).sort({date:-1}).limit(5)).map(
                (transaction) => ({
                    ...transaction.toObject(),
                    type:"income",
                })
            ),
            ...(await Expense.find({userId}).sort({date:-1}).limit(5)).map(
                (transaction) => ({
                    ...transaction.toObject(),
                    type:"expense",
                })
            )
        ].sort((a,b) => b.date - a.date); // latest first

        //final response
        res.json({
            totalBalance:(totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0,
            last30DaysExpenses: {
                total: totalExpenseLast30Days,
                transaction: last30DaysExpenseTransactions
            },
            last60DaysIncomeTransactions: {
                total: totalIncomeLast60Days,
                transactions: last60DaysIncomeTransactions,
            },
            recentTransactions: lastFiveTransactions,
        })
    } catch (error) {
        console.log("Error in getting dashboard data",error)
        res.status(500).json({error:error.message});
    }
}