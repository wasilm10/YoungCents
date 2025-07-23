import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const CustomPieChart = ({ data, totalAmount, colors, label }) => {
  return (
    <div className="relative w-full max-w-md bg-white p-6 rounded-xl shadow-md">
      <h6 className="text-lg font-semibold text-gray-700 mb-4 text-center">{label}</h6>
      
      <div className="relative flex justify-center items-center h-[300px]">
        <ResponsiveContainer width={300} height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={5}
              label={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        {/* Total in center */}
        <div className="absolute text-center">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-lg font-bold text-gray-800">{totalAmount}</p>
        </div>
      </div>

      {/* Custom Legends */}
      <div className="mt-6 space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colors[index % colors.length] }}
              ></div>
              <span>{item.name}</span>
            </div>
            <span>₹{item.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomPieChart;
