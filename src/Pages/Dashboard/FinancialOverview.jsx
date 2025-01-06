import React from 'react';

const FinancialOverview = ({ data }) => {
    const calculateTotals = () => {
        if (!data || data.length === 0) {
            return {
                totalBalance: 12345.67,
                monthlyIncome: 5000.00,
                monthlyExpenses: 3500.00,
                savingsRate: 30
            };
        }

        const income = data.reduce((sum, transaction) => sum + (transaction.amount > 0 ? parseFloat(transaction.amount) : 0), 0);
        const expenses = data.reduce((sum, transaction) => sum + (transaction.amount < 0 ? Math.abs(parseFloat(transaction.amount)) : 0), 0);
        const balance = income - expenses;
        const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0;

        return {
            totalBalance: balance,
            monthlyIncome: income,
            monthlyExpenses: expenses,
            savingsRate: savingsRate.toFixed(2)
        };
    };

    const { totalBalance, monthlyIncome, monthlyExpenses, savingsRate } = calculateTotals();

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Financial Overview</h2>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="text-sm text-gray-500">Total Balance</p>
                    <p className="text-2xl font-bold">${totalBalance.toFixed(2)}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Monthly Income</p>
                    <p className="text-2xl font-bold">${monthlyIncome.toFixed(2)}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Monthly Expenses</p>
                    <p className="text-2xl font-bold">${monthlyExpenses.toFixed(2)}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Savings Rate</p>
                    <p className="text-2xl font-bold">{savingsRate}%</p>
                </div>
            </div>
        </div>
    );
};

export default FinancialOverview;

