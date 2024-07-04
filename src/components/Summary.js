import React, { useState, useEffect } from "react";
import { useTransactions } from "../context/TransactionsContext";

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

    return (
        <>
            {loading ? (
                "loding"
            ) : (
                <>
                    <h2>Summary</h2> <p>Total Income: ${income.toFixed(2)}</p>
                    <p>Total Expenses: ${expenses.toFixed(2)}</p>
                    <p>Balance: ${balance.toFixed(2)}</p>
                </>
            )}
        </>
    );
};

export default Summary;
