// src/components/AddTransaction.js
import React, { useState } from "react";
import axios from "axios";
import style from "./addTransaction.module.css";

const AddTransaction = () => {

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

        const newTransaction = {
            ...formValue,
            amount: parseFloat(formValue.amount)
        };

        try {
            await axios.post("http://localhost:5000/transactions", newTransaction);
            alert("Transaction added successfully!");
            setFormValue({ type: "", amount: "", category: "", date: "" });
        } catch (error) {
            console.error("Error adding transaction:", error);
        }
    };

    const handleOnchange = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value })
    }

    return (
        <div className={style["container"]}>
            <form className={style["form-wrap"]} onSubmit={handleSubmit}>
                <h1>{formValue.type === "income" ? "Income" : "Expense"}</h1>
                <div className={style["form-group"]}>
                    <label for="first-name">Select Type(Income/Expenses)</label>
                    <select value={formValue.type} onChange={handleOnchange} name="type">
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>
                <div className={style["form-group"]}>
                    <label for="first-name">Amount</label>
                    <input
                        type="text"
                        name="amount"
                        id="amount"
                        onChange={handleOnchange} v
                        alue={formValue.amount}
                    />
                </div>
                <div className={style["form-group"]}>
                    <label for="last-name">Category</label>
                    <input
                        type="text"
                        name="category"
                        id="category"
                        onChange={handleOnchange}
                        value={formValue.category}
                    />
                </div>
                <div className={style["form-group"]}>
                    <label for="email">Date</label>
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
        </div>
    );
};

export default AddTransaction;
