const User = require("../models/User");
const Income = require("../models/Income");
const xlsx = require("xlsx");

// Add Income Source
exports.addIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, source, amount, date } = req.body;

        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (isNaN(new Date(date).getTime())) {
            return res.status(400).json({ message: "Invalid date format" });
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date),
        });

        await newIncome.save();

        res.status(201).json({
            message: "Income added successfully",
            income: newIncome,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
};

// Get All Incomes
exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });
        res.status(200).json(income);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Delete Income Source
exports.deleteIncome = async (req, res) => {
    try {
        await Income.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Income deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Download Income Excel
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        const data = income.map(item => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date.toISOString().split('T')[0],
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");

        const filePath = "income_details.xlsx";
        xlsx.writeFile(wb, filePath);

        res.download(filePath);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
