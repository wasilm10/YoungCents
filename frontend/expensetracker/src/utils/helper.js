import moment from "moment";

export const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const addThousandSeparator = (num) => {
  if (num == null || isNaN(num)) return "";

  const [integerPart, fractionPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionPart
    ? `${formattedInteger}.${fractionPart}`
    : formattedInteger;
};

export const prepareExpenseBarChart = (data = []) => {
  return data.map((item) => ({
    category: item?.category,
    amount: item?.amount,
  }));
};
export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
  return sortedData.map((item) => ({
    month: moment(item.date).format('Do MMM'),
    amount: item.amount,
    source: item.source,
  }));
};
export const prepareExpenseLineChartData = (transactions = []) => {
  const monthlyTotals = {};

  transactions.forEach((txn) => {
    const date = new Date(txn.date); // assumes txn.date is ISO string
    const monthLabel = date.toLocaleString('default', { month: 'short', year: '2-digit' });

    if (!monthlyTotals[monthLabel]) {
      monthlyTotals[monthLabel] = 0;
    }
    monthlyTotals[monthLabel] += txn.amount;
  });

  const result = Object.entries(monthlyTotals).map(([label, value]) => ({
    label,
    value,
  }));

  // sort by month chronological order
  return result.sort((a, b) => new Date('01 ' + a.label) - new Date('01 ' + b.label));
};




