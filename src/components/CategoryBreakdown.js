// src/components/CategoryBreakdown.js
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useTransactions } from "../context/TransactionsContext";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const CategoryBreakdown = () => {
    const { state } = useTransactions();
    const { transactions } = state;
    const [loading, setLoading] = useState(true);
    const data = transactions
        .filter((transaction) => transaction.type === "expense")
        .reduce((acc, transaction) => {
            const category = acc.find((item) => item.name === transaction.category);
            if (category) {
                category.value += transaction.amount;
            } else {
                acc.push({ name: transaction.category, value: transaction.amount });
            }
            return acc;
        }, []);
    useEffect(() => {
        if (transactions) {
            setLoading(false);
        }
    }, [transactions]);

    return (
        <>
            <h2>Category Breakdown</h2>
            <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    fill="#8884d8"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </>
    );
};

export default CategoryBreakdown;
