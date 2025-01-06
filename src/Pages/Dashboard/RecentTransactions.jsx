import React from 'react';

const RecentTransactions = ({ transactions }) => {
    const sampleTransactions = [
        { date: '2023-04-01', description: 'Grocery Store', amount: -75.50, category: 'Food' },
        { date: '2023-04-02', description: 'Gas Station', amount: -45.00, category: 'Transportation' },
        { date: '2023-04-03', description: 'Online Shopping', amount: -120.99, category: 'Shopping' },
        { date: '2023-04-04', description: 'Salary Deposit', amount: 3000.00, category: 'Income' },
        { date: '2023-04-05', description: 'Restaurant', amount: -65.75, category: 'Food' },
    ];

    const displayTransactions = transactions.length > 0 ? transactions.slice(0, 5) : sampleTransactions;

    return (
        <div className="bg-white p-4 rounded-lg shadow col-span-full">
            <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Description</th>
                            <th className="px-6 py-3">Amount</th>
                            <th className="px-6 py-3">Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayTransactions.map((transaction, index) => (
                            <tr key={index} className="bg-white border-b">
                                <td className="px-6 py-4">{transaction.date}</td>
                                <td className="px-6 py-4">{transaction.description}</td>
                                <td className={`px-6 py-4 ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    ${Math.abs(parseFloat(transaction.amount)).toFixed(2)}
                                </td>
                                <td className="px-6 py-4">{transaction.category}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentTransactions;

