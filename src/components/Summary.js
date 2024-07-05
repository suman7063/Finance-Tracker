// src/components/Summary.js
import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useTransactions } from "../context/TransactionsContext";
import commonStyle from "../styles/common.module.css";

const COLORS = ["#82ca9d", "#8884d8"]; // Colors for income and expense slices

const Summary = () => {
    const { state } = useTransactions();
    const { transactions } = state;
    const [loading, setLoading] = useState(true);

    const income = transactions
        .filter((transaction) => transaction.type === "income")
        .reduce((acc, transaction) => acc + transaction.amount, 0);
    const expenses = transactions
        .filter((transaction) => transaction.type === "expense")
        .reduce((acc, transaction) => acc + transaction.amount, 0);
    const balance = income - expenses;

    useEffect(() => {
        if (transactions) {
            setLoading(false);
        }
    }, [transactions]);

    // Data for pie chart
    const data = [
        { name: "Income", value: income },
        { name: "Expenses", value: expenses }
    ];

    return (
        <div className={commonStyle["main-container"]}>
            {loading ? (
                "Loading..."
            ) : (
                <>
                    <p className={commonStyle["subTitle"]}>Total Income: <span>{income.toFixed(2)}</span></p>
                    <p className={commonStyle["subTitle"]}>Total Expenses: <span>{expenses.toFixed(2)}</span> </p>
                    <p className={commonStyle["subTitle"]}>Balance:  <span>{balance.toFixed(2)}</span></p>
                    <ResponsiveContainer width="100%" height={400} >
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
                                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>

                </>
            )
            }
        </div >
    );
};

export default Summary;
