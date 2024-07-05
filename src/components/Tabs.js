import React, { useState } from "react";
import style from "../styles/tabs.module.css";
const Tab = ({ label, onClick, active }) => {
    return (
        <button
            onClick={onClick}
            className={`${style["tab-btn"]} ${active ? style["highlight"] : ""}`}
        >
            {label}
        </button>
    );
};
const Tabs = ({ children }) => {
    const [activeTab, setActiveTab] = useState(children[0].props.label);
    const [isForMob, setIsForMob] = useState(false);
    const onClickTabItem = (tab) => {
        setActiveTab(tab);
        setIsForMob(false)
    };
    const handleClick = () => {
        setIsForMob(true);
    };
    return (
        <div>
            <div className={style["container"]}>
                <div className={style['wrap-mob-icon']}>
                    <h1>Finance Tracker</h1>
                    <div className={`${style["mob-icon"]} ${isForMob ? style["change"] : ""}`} onClick={handleClick}>
                        <div className={style["bar1"]} />
                        <div className={style["bar2"]} />
                        <div className={style["bar3"]} />
                    </div>
                </div>
                <div className={`${style["tab-list"]} ${isForMob ? style["hideAtDesktop"] : ""}`}>
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

            </div>

            <div className={style["tab-content"]}>
                {children.map((child) => {
                    if (child.props.label !== activeTab) return undefined;
                    return child.props.children;
                })}
            </div>
        </div>
    );
};
export default Tabs;
