import React from 'react';

const ExpenseBreakdown = ({ data }) => {
    const calculateExpenses = () => {
        if (!data || data.length === 0) {
            return [
                { category: 'Housing', amount: 1500, percentage: 40 },
                { category: 'Food', amount: 600, percentage: 17 },
                { category: 'Transportation', amount: 400, percentage: 11 },
                { category: 'Utilities', amount: 300, percentage: 9 },
                { category: 'Entertainment', amount: 200, percentage: 6 },
                { category: 'Other', amount: 500, percentage: 17 },
            ];
        }

        const expensesByCategory = data.reduce((acc, transaction) => {
            if (transaction.amount < 0) {
                const category = transaction.category || 'Other';
                acc[category] = (acc[category] || 0) + Math.abs(parseFloat(transaction.amount));
            }
            return acc;
        }, {});

        const totalExpenses = Object.values(expensesByCategory).reduce((sum, amount) => sum + amount, 0);

        return Object.entries(expensesByCategory).map(([category, amount]) => ({
            category,
            amount,
            percentage: ((amount / totalExpenses) * 100).toFixed(2)
        })).sort((a, b) => b.amount - a.amount);
    };

    const expenses = calculateExpenses();

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Expense Breakdown</h2>
            <div className="space-y-2">
                {expenses.map((expense) => (
                    <div key={expense.category}>
                        <div className="flex justify-between text-sm">
                            <span>{expense.category}</span>
                            <span>${expense.amount.toFixed(2)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className="bg-blue-600 h-2.5 rounded-full"
                                style={{ width: `${expense.percentage}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExpenseBreakdown;

