import React from "react";
import AddTransaction from "./components/AddTransaction";
import TransactionList from "./components/TransactionList";
import Summary from "./components/Summary";
import CategoryBreakdown from "./components/CategoryBreakdown";
import Tabs from "./components/Tabs";
const Dashboard = () => {
    return (
        <div>
            <h1>Finance Tracker</h1>
            <Tabs>
                <div label="Add Transaction">
                    <AddTransaction />
                </div>
                <div label="Transaction List">
                    <TransactionList />
                </div>
                <div label="Summary">
                    <Summary />
                </div>
                <div label="Category breakdown">
                    <CategoryBreakdown />
                </div>
            </Tabs>
        </div>
    );
};
export default Dashboard;
