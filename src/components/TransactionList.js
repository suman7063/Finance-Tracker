import React, { useEffect, useState } from "react";
import { useTransactions } from "../context/TransactionsContext";
import style from "../styles/transactionList.module.css";
import commonStyle from "../styles/common.module.css";
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
        <div className={commonStyle["main-container"]}>
            <div className={style["table-container"]}>
                <table className={style["transaction-table"]}>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(transaction => (
                            <tr key={transaction.id}>
                                <td>{transaction.type}</td>
                                <td>{transaction.amount}</td>
                                <td>{transaction.category}</td>
                                <td>{transaction.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionList;
