import React, { useEffect, useState } from 'react';

const CurrencyConverter: React.FC = () => {
    const [currencies, setCurrencies] = useState<string[]>([]);
    const [fromCurrency, setFromCurrency] = useState<string>('USD');
    const [toCurrency, setToCurrency] = useState<string>('EUR');
    const [amount, setAmount] = useState<number>(1);
    const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);

    const API_URL = import.meta.env.VITE_API_URL;
    const API_KEY = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        fetch(`${API_URL}/${API_KEY}/latest/USD`)
            .then(response => response.json())
            .then(data => setCurrencies(Object.keys(data.conversion_rates)));
    }, [API_URL, API_KEY]);

    useEffect(() => {
        if (amount && fromCurrency && toCurrency && date) {
            const [year, month, day] = date.split('-');
            fetch(`${API_URL}/${API_KEY}/history/${fromCurrency}/${year}/${month}/${day}`)
                .then(response => response.json())
                .then(data => {
                    if (data.conversion_rates) {
                        setConvertedAmount(data.conversion_rates[toCurrency] * amount);
                    } else {
                        setConvertedAmount(null);
                    }
                });
        }
    }, [amount, fromCurrency, toCurrency, date, API_URL, API_KEY]);

    return (
        <div className="converter-container">
            <h1>Currency Converter</h1>
            <div className="form-group">
                <label>Amount:</label>
                <input type="number" value={amount} onChange={e => setAmount(parseFloat(e.target.value))} />
            </div>
            <div className="form-group">
                <label>From:</label>
                <select value={fromCurrency} onChange={e => setFromCurrency(e.target.value)}>
                    {currencies.map(currency => (
                        <option key={currency} value={currency}>{currency}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>To:</label>
                <select value={toCurrency} onChange={e => setToCurrency(e.target.value)}>
                    {currencies.map(currency => (
                        <option key={currency} value={currency}>{currency}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Date:</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} />
            </div>
            <div className="result">
                {convertedAmount !== null && (
                    <p>
                        {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
                    </p>
                )}
            </div>
        </div>
    );
};

export default CurrencyConverter;
