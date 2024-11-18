import React, { useState } from 'react';

const ReactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: ''
    });
    const [tableData, setTableData] = useState([]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setTableData((prevData) => [...prevData, formData]);
        setFormData({ name: '', email: '', age: '' }); // Reset form after submit
    };

    // Handle form reset
    const handleReset = () => {
        setFormData({ name: '', email: '', age: '' }); // Clear form data
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-gray-700 mb-6">Form without React Hook Form</h1>

        <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
            <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Name</label>
            <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-2 p-3 w-full border border-gray-300 rounded-md"
                required
            />
            </div>

            <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
            <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-2 p-3 w-full border border-gray-300 rounded-md"
                required
            />
            </div>

            <div className="mb-4">
            <label htmlFor="age" className="block text-sm font-semibold text-gray-700">Age</label>
            <input
                id="age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleInputChange}
                className="mt-2 p-3 w-full border border-gray-300 rounded-md"
                required
            />
            </div>

            <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
            >
            Submit
            </button>
            <button
            type="button"
            onClick={handleReset}
            className="w-full mt-4 bg-red-500 text-white p-3 rounded-md hover:bg-red-600"
            >
            Reset
            </button>
        </form>

        <div className="mt-8 w-full max-w-4xl overflow-x-auto">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Submitted Data</h2>
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
                <tr className="border-b bg-gray-100">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Age</th>
                </tr>
            </thead>
            <tbody>
                {tableData.length === 0 ? (
                <tr>
                    <td colSpan="3" className="px-6 py-3 text-center text-sm text-gray-500">No data submitted yet</td>
                </tr>
                ) : (
                tableData.map((row, index) => (
                    <tr key={index} className="border-b">
                    <td className="px-6 py-3 text-sm text-gray-700">{row.name}</td>
                    <td className="px-6 py-3 text-sm text-gray-700">{row.email}</td>
                    <td className="px-6 py-3 text-sm text-gray-700">{row.age}</td>
                    </tr>
                ))
                )}
            </tbody>
            </table>
        </div>
        </div>
    );
};

export default ReactForm;