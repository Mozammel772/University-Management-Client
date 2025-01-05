import React, { useState } from 'react';
import CSVUpload from './CSVUpload';
import FinancialOverview from './FinancialOverview';
import ExpenseBreakdown from './ExpenseBreakdown';
import RecentTransactions from './RecentTransactions';
import BudgetProgress from './BudgetProgress';
import ThirtyDaysReport from './ThirtyDaysReport';
import LastSevenDaysReport from './LastSevenDaysReport';
const Dashboard = () => {
    const [csvData, setCsvData] = useState([]);
    const [activeTab, setActiveTab] = useState('overview');

    const handleCSVUpload = (data) => {
        setCsvData(data);
    };

    const renderActiveTab = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <>
                        <FinancialOverview data={csvData} />
                        <ExpenseBreakdown data={csvData} />
                        <RecentTransactions transactions={csvData} />
                        <BudgetProgress data={csvData} />
                    </>
                );
            case 'last7days':
                return <LastSevenDaysReport data={csvData} />;
            case 'last30days':
                return <ThirtyDaysReport data={csvData} />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-blue-600 text-white p-4">
                <h1 className="text-2xl font-bold">Money Management Dashboard</h1>
            </header>
            <main className="p-4">
                <CSVUpload onUpload={handleCSVUpload} />
                <div className="mt-4 bg-white rounded-lg shadow p-4">
                    <div className="flex space-x-4 mb-4">
                        <button
                            className={`px-4 py-2 rounded ${activeTab === 'overview' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            onClick={() => setActiveTab('overview')}
                        >
                            Overview
                        </button>
                        <button
                            className={`px-4 py-2 rounded ${activeTab === 'last7days' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            onClick={() => setActiveTab('last7days')}
                        >
                            Last 7 Days
                        </button>
                        <button
                            className={`px-4 py-2 rounded ${activeTab === 'last30days' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            onClick={() => setActiveTab('last30days')}
                        >
                            Last 30 Days
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {renderActiveTab()}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;

