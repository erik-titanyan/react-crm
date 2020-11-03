import React from 'react';
import { setCurrencyFilter } from '../hooks/setCurrencyFilter.hook';
import { setDateFilter } from '../hooks/setDateFilter.hook';

const CurrencyBill = ({ rates, date }) => {

    const currency = ['AMD', 'USD', 'EUR']

    return (
       <div className="col s12 m6 l8">
        <div className="card orange darken-3 bill-card">
            <div className="card-content white-text">
            <div className="card-header">
                <span className="card-title">Currency</span>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Currency</th>
                    <th>Rate</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {currency.map((curr, idx) => {
                    return  <tr key={idx}>
                                <td>{curr}</td>
                                <td>{rates[curr]}</td>
                                <td>{setDateFilter(date)}</td>
                             </tr>
                })}
               
                </tbody>
            </table>
            </div>
        </div>
    </div>

    )
}



export default CurrencyBill