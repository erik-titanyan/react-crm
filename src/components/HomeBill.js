import React from 'react'
import { setCurrencyFilter } from '../hooks/setCurrencyFilter.hook'


const HomeBill = ({ bill, rates }) => {

	
	const currency = ['AMD', 'USD', 'EUR']

	const base = bill / (rates['AMD'] / rates['EUR'])
	
	

	const calculateCurrency = (curr) => Math.floor(base * rates[curr])
	
		return (
			<div className="col s12 m6 l4">
				<div className="card light-blue bill-card">
					<div className="card-content white-text">
						<span className="card-title">Balance in currency</span>
						{currency.map( (curr, idx) => {
							return <p className="currency-line" key={idx}>
											<span>{setCurrencyFilter(calculateCurrency(curr), curr)}</span>
										</p>
						})}
						
					</div>
				</div>
			</div>
    )
}




export default HomeBill