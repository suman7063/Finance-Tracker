import React, { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Legend,
    ResponsiveContainer,
    Tooltip,
} from "recharts";
import { useTransactions } from "../context/TransactionsContext";
import commonStyle from "../styles/common.module.css";
const CategoryBreakdown = () => {
    const { state } = useTransactions();
    const { transactions } = state;
    const [loading, setLoading] = useState(true);
    const data = transactions.reduce((acc, transaction) => {
        const category = acc.find((item) => item.category === transaction.category);
        if (category) {
            category[transaction.type] += transaction.amount;
        } else {
            acc.push({
                category: transaction.category,
                income: transaction.type === "income" ? transaction.amount : 0,
                expense: transaction.type === "expense" ? transaction.amount : 0,
            });
        }
        return acc;
    }, []);
    useEffect(() => {
        if (transactions) {
            setLoading(false);
        }
    }, [transactions]);

    return (
        <div className={commonStyle["main-container"]}>
            {loading ? (
                <>loding...</>
            ) : (
                <ResponsiveContainer width="100%" height={400} >
                    <BarChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="income" fill="#82ca9d" />
                        <Bar dataKey="expense" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default CategoryBreakdown;
