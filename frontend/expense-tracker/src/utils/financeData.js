import {income} from './incomeRawData.js';
import {expense} from './expenseRawData.js';


export const recentTransactions = [
    ...(income.sort((a,b) => new Date(b.date) - new Date(a.date)).map(
        (transaction) => ({
            ...transaction,
            type: 'income',
        })
    )),

    ...(expense.sort((a,b) => new Date(b.date) - new Date(a.date)).map(
        (transaction) => ({
            ...transaction,
            type: 'expense',
        })
    ))
].sort((a,b) => new Date(b.date) - new Date(a.date));


export const incomeData = income;

export const expenseData = expense;


