import React from 'react';
import CurrencyConverter  from './components/CurrencyConverter';
import './App.css';

const App: React.FC = () => {
    return (
        <div className="app-container">
            <CurrencyConverter />
        </div>
    );
};

export default App;
