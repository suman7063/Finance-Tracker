import React, { useEffect, useState } from "react";
import { useTransactions } from "../context/TransactionsContext";
import style from "../styles/transactionList.module.css";
import commonStyle from "../styles/common.module.css";
const TransactionList = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const { state, dispatch } = useTransactions();
    const { filteredTransactions, transactions } = state;
    const [loading, setLoading] = useState(true);
    const handleFilter = () => {
        const updateState = transactions.filter(transaction => {
            const transactionDate = new Date(transaction.date);
            return (!startDate || new Date(startDate) <= transactionDate) &&
                (!endDate || new Date(endDate) >= transactionDate);
        });
        dispatch({ type: 'SET_FILTERED_TRANSACTIONS', payload: updateState });
    };
    useEffect(() => {
        if (transactions) {
            setLoading(false);
        }
    }, [transactions]);

    if (loading) return <div>Loading...</div>;
    return (
        <div className={commonStyle["main-container"]}>
            <div className={style['filter-container']}>
                <div className={style["wrap-inp"]}>
                    <div className={style["label"]}>Start Date: </div>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className={style["wrap-inp"]}>
                    <div className={style["label"]}>End Date: </div>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
                <button className={style["filter-btn"]} onClick={handleFilter}>
                    Filter
                </button>
            </div>
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
                        {filteredTransactions.map(item => (
                            <tr key={item.id}>
                                <td>{item.type}</td>
                                <td>{item.amount}</td>
                                <td>{item.category}</td>
                                <td>{item.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionList;
