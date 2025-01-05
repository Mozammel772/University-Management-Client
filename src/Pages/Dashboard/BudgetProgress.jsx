import React from 'react';

const BudgetProgress = ({ data }) => {
    const calculateBudgetProgress = () => {
        if (!data || data.length === 0) {
            return [
                { category: 'Housing', spent: 1200, budget: 1500 },
                { category: 'Food', spent: 450, budget: 600 },
                { category: 'Transportation', spent: 300, budget: 400 },
                { category: 'Entertainment', spent: 150, budget: 200 },
            ];
        }

        const expensesByCategory = data.reduce((acc, transaction) => {
            if (transaction.amount < 0) {
                const category = transaction.category || 'Other';
                acc[category] = (acc[category] || 0) + Math.abs(parseFloat(transaction.amount));
            }
            return acc;
        }, {});

        // This is a simplified budget calculation. In a real app, you'd want to store budgets separately.
        const budgets = {
            Housing: 1500,
            Food: 600,
            Transportation: 400,
            Entertainment: 200,
            Other: 500,
        };

        return Object.entries(expensesByCategory).map(([category, spent]) => ({
            category,
            spent,
            budget: budgets[category] || spent * 1.2, // If no budget is set, assume 20% more than spent
        }));
    };

    const budgetCategories = calculateBudgetProgress();

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Budget Progress</h2>
            <div className="space-y-4">
                {budgetCategories.map((item) => (
                    <div key={item.category}>
                        <div className="flex justify-between text-sm mb-1">
                            <span>{item.category}</span>
                            <span>${item.spent.toFixed(2)} / ${item.budget.toFixed(2)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className="bg-blue-600 h-2.5 rounded-full"
                                style={{ width: `${Math.min((item.spent / item.budget) * 100, 100)}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BudgetProgress;

