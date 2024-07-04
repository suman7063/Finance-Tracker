import React, { useEffect, useState } from "react";
import { useTransactions } from "../context/TransactionsContext";

const TransactionList = () => {
    const { state } = useTransactions();
    const { transactions } = state;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (transactions) {
            setLoading(false);
        }
    }, [transactions]);

    if (loading) return <div>Loading...</div>;

    return (
        <ul>
            {transactions.map((transaction) => (
                <li key={transaction.id}>
                    {transaction.type} - {transaction.amount} - {transaction.category} -{" "}
                    {transaction.date}
                </li>
            ))}
        </ul>
    );
};

export default TransactionList;
