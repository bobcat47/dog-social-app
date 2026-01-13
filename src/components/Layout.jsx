import React from 'react';
import Navbar from './Navbar';
import './Layout.css';

const Layout = ({ children, activeTab, onTabChange }) => {
    // Configured to receive state from parent (App.jsx)
    // Props:
    // - activeTab: current tab name string
    // - onTabChange: function to update tab name

    return (
        <div className="layout">
            <main className="main-content">
                {React.Children.map(children, child => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, { activeTab, setActiveTab: onTabChange });
                    }
                    return child;
                })}
            </main>
            <Navbar activeTab={activeTab} onTabChange={onTabChange} />
        </div>
    );
};

export default Layout;
