import React, { createContext, useReducer, useContext, useEffect } from 'react';
import axios from 'axios';

const TransactionsContext = createContext();

const transactionsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TRANSACTIONS':
            return { ...state, transactions: action.payload, filteredTransactions: action.payload };
        case 'ADD_TRANSACTION':
            const updatedTransactions = [...state.transactions, action.payload];
            return { ...state, transactions: updatedTransactions, filteredTransactions: updatedTransactions };
        case 'SET_FILTERED_TRANSACTIONS':
            return { ...state, filteredTransactions: action.payload };
        default:
            return state;
    }
};

export const TransactionsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(transactionsReducer, { transactions: [] });

    const fetchTransactions = async () => {
        try {
            const response = await axios.get('https://json-server-deployment-xfbx.onrender.com/transactions');
            dispatch({ type: 'SET_TRANSACTIONS', payload: response.data });
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };
    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <TransactionsContext.Provider value={{ state, dispatch }}>
            {children}
        </TransactionsContext.Provider>
    );
};

export const useTransactions = () => useContext(TransactionsContext);
