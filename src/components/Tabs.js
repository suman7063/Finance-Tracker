import React, { useState } from 'react';
const Tab = ({ label, onClick, active }) => {
    return (
        <button
            onClick={onClick}
            style={{
                padding: '10px',
                margin: '0 5px',
                cursor: 'pointer',
                borderBottom: active ? '2px solid blue' : '2px solid transparent'
            }}>
            {label}
        </button>
    );
};
const Tabs = ({ children }) => {
    const [activeTab, setActiveTab] = useState(children[0].props.label);

    const onClickTabItem = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div>
            <div className="tab-list">
                {children.map((child) => {
                    const { label } = child.props;
                    return (
                        <Tab
                            key={label}
                            label={label}
                            onClick={() => onClickTabItem(label)}
                            active={label === activeTab}
                        />
                    );
                })}
            </div>
            <div className="tab-content">
                {children.map((child) => {
                    if (child.props.label !== activeTab) return undefined;
                    return child.props.children;
                })}
            </div>
        </div>
    );
};
export default Tabs