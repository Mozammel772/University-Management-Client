import React from 'react';
import Papa from 'papaparse';

const CSVUpload = ({ onUpload }) => {
    const handleFileUpload = (event) => {
        const file = event.target.files?.[0];
        console.log('start')
        if (file) {
            Papa.parse(file, {
                complete: (result) => {
                    console.log(result)
                    onUpload(result.data);
                },
                header: true,
            });
        }
        console.log('end')
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Upload CSV</h2>
            <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
            />
        </div>
    );
};

export default CSVUpload;

