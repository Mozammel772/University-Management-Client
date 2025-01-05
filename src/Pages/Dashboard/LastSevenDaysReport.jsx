import React from 'react';

const LastSevenDaysReport = ({ data }) => {
    const calculateLastSevenDays = () => {
        if (!data || data.length === 0) {
            return {
                totalIncome: 1000,
                totalExpenses: 750,
                topExpenseCategories: [
                    { category: 'Food', amount: 200 },
                    { category: 'Transportation', amount: 150 },
                    { category: 'Entertainment', amount: 100 },
                    { category: 'Shopping', amount: 75 },
                ],
                dailyExpenses: [
                    { date: '2023-04-01', amount: 120 },
                    { date: '2023-04-02', amount: 85 },
                    { date: '2023-04-03', amount: 150 },
                    { date: '2023-04-04', amount: 95 },
                    { date: '2023-04-05', amount: 110 },
                    { date: '2023-04-06', amount: 130 },
                    { date: '2023-04-07', amount: 60 },
                ],
            };
        }

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const lastSevenDaysData = data.filter(transaction => new Date(transaction.date) >= sevenDaysAgo);

        const totalIncome = lastSevenDaysData.reduce((sum, transaction) => sum + (transaction.amount > 0 ? parseFloat(transaction.amount) : 0), 0);
        const totalExpenses = lastSevenDaysData.reduce((sum, transaction) => sum + (transaction.amount < 0 ? Math.abs(parseFloat(transaction.amount)) : 0), 0);

        const expensesByCategory = lastSevenDaysData.reduce((acc, transaction) => {
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

        const dailyExpenses = Array.from({ length: 7 }, (_, i) => {
            const date = new Date(sevenDaysAgo);
            date.setDate(date.getDate() + i);
            const dateString = date.toISOString().split('T')[0];
            const amount = lastSevenDaysData
                .filter(transaction => transaction.date === dateString && transaction.amount < 0)
                .reduce((sum, transaction) => sum + Math.abs(parseFloat(transaction.amount)), 0);
            return { date: dateString, amount };
        });

        return { totalIncome, totalExpenses, topExpenseCategories, dailyExpenses };
    };

    const { totalIncome, totalExpenses, topExpenseCategories, dailyExpenses } = calculateLastSevenDays();

    return (
        <div className="col-span-full">
            <h2 className="text-2xl font-bold mb-4">Last 7 Days Report</h2>
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
                    <h3 className="text-lg font-semibold mb-2">Daily Expenses</h3>
                    <div className="flex items-end space-x-2 h-40">
                        {dailyExpenses.map((day, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div
                                    className="bg-blue-500 w-8"
                                    style={{ height: `${(day.amount / Math.max(...dailyExpenses.map(d => d.amount))) * 100}%` }}
                                ></div>
                                <span className="text-xs mt-1">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LastSevenDaysReport;

