import React, { useState } from "react";
import axios from "axios";
import { useTransactions } from "../context/TransactionsContext";
import style from "../styles/addTransaction.module.css";

const AddTransaction = () => {
    const { dispatch } = useTransactions();
    const [formValue, setFormValue] = useState({
        type: "",
        amount: 0,
        category: '',
        date: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formValue.type || !formValue.amount || !formValue.category || !formValue.date) {
            alert("Please fill in all fields.");
            return;
        }

        if (formValue.amount < 1) {
            alert("Please set amount greter than 1");
        }
        const newTransaction = {
            ...formValue,
            amount: parseFloat(formValue.amount)
        };

        try {
            const response = await axios.post("http://localhost:5000/transactions", newTransaction);
            alert("Transaction added successfully!");
            dispatch({ type: 'ADD_TRANSACTION', payload: response.data });
            setFormValue({ type: "", amount: 0, category: "", date: "" });
        } catch (error) {
            console.error("Error adding transaction:", error);
        }
    };

    const handleOnchange = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value })
    }

    return (
        <form className={style["form-wrap"]} onSubmit={handleSubmit}>
            <h1>{formValue.type === "income" ? "Income" : "Expense"}</h1>
            <div className={style["form-group"]}>
                <select value={formValue.type} onChange={handleOnchange} name="type">
                    <option value="">Select Type Income/Expenses</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
            </div>
            <div className={style["form-group"]}>
                <label htmlFor="amount">Amount</label>
                <input
                    type="text"
                    name="amount"
                    id="amount"
                    onChange={handleOnchange} v
                    value={formValue.amount}
                />
            </div>
            <div className={style["form-group"]}>
                <label htmlFor="category">Category</label>
                <input
                    type="text"
                    name="category"
                    id="category"
                    onChange={handleOnchange}
                    value={formValue.category}
                />
            </div>
            <div className={style["form-group"]}>
                <label htmlFor="date">Date</label>
                <input
                    type="date"
                    name="date"
                    id="date"
                    onChange={handleOnchange}
                    value={formValue.date}
                />
            </div>

            <button type="submit" className={style["btn"]}>
                {formValue.type === "income" ? "Add Income" : "Add Expense"}
            </button>
        </form>
    );
};

export default AddTransaction;
