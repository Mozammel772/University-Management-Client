import React from 'react';

const ThirtyDaysReport = ({ data }) => {
    const calculateLastThirtyDays = () => {
        if (!data || data.length === 0) {
            return {
                totalIncome: 5000,
                totalExpenses: 3750,
                topExpenseCategories: [
                    { category: 'Housing', amount: 1500 },
                    { category: 'Food', amount: 800 },
                    { category: 'Transportation', amount: 500 },
                    { category: 'Utilities', amount: 400 },
                    { category: 'Entertainment', amount: 300 },
                ],
                weeklyExpenses: [
                    { week: 'Week 1', amount: 1000 },
                    { week: 'Week 2', amount: 950 },
                    { week: 'Week 3', amount: 1100 },
                    { week: 'Week 4', amount: 700 },
                ],
            };
        }

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const lastThirtyDaysData = data.filter(transaction => new Date(transaction.date) >= thirtyDaysAgo);

        const totalIncome = lastThirtyDaysData.reduce((sum, transaction) => sum + (transaction.amount > 0 ? parseFloat(transaction.amount) : 0), 0);
        const totalExpenses = lastThirtyDaysData.reduce((sum, transaction) => sum + (transaction.amount < 0 ? Math.abs(parseFloat(transaction.amount)) : 0), 0);

        const expensesByCategory = lastThirtyDaysData.reduce((acc, transaction) => {
            if (transaction.amount < 0) {
                const category = transaction.category || 'Other';
                acc[category] = (acc[category] || 0) + Math.abs(parseFloat(transaction.amount));
            }
            return acc;
        }, {});

        const topExpenseCategories = Object.entries(expensesByCategory)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([category, amount]) => ({ category, amount }));

        const weeklyExpenses = Array.from({ length: 4 }, (_, i) => {
            const weekStart = new Date(thirtyDaysAgo);
            weekStart.setDate(weekStart.getDate() + i * 7);
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekEnd.getDate() + 6);

            const amount = lastThirtyDaysData
                .filter(transaction => {
                    const transactionDate = new Date(transaction.date);
                    return transactionDate >= weekStart && transactionDate <= weekEnd && transaction.amount < 0;
                })
                .reduce((sum, transaction) => sum + Math.abs(parseFloat(transaction.amount)), 0);

            return { week: `Week ${i + 1}`, amount };
        });

        return { totalIncome, totalExpenses, topExpenseCategories, weeklyExpenses };
    };

    const { totalIncome, totalExpenses, topExpenseCategories, weeklyExpenses } = calculateLastThirtyDays();

    return (
        <div className="col-span-full">
            <h2 className="text-2xl font-bold mb-4">Last 30 Days Report</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2">Summary</h3>
                    <p>Total Income: ${totalIncome.toFixed(2)}</p>
                    <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
                    <p>Net: ${(totalIncome - totalExpenses).toFixed(2)}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2">Top Expense Categories</h3>
                    <ul>
                        {topExpenseCategories.map((category, index) => (
                            <li key={index}>{category.category}: ${category.amount.toFixed(2)}</li>
                        ))}
                    </ul>
                </div>
                <div className="bg-white p-4 rounded-lg shadow col-span-full">
                    <h3 className="text-lg font-semibold mb-2">Weekly Expenses</h3>
                    <div className="flex items-end space-x-2 h-40">
                        {weeklyExpenses.map((week, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div
                                    className="bg-blue-500 w-16"
                                    style={{ height: `${(week.amount / Math.max(...weeklyExpenses.map(w => w.amount))) * 100}%` }}
                                ></div>
                                <span className="text-xs mt-1">{week.week}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThirtyDaysReport;

