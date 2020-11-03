export const setCurrencyFilter = (curr, currency = 'AMD') => {
    const options = {
        style: 'currency',
        currency
    }
    
    return new Intl.NumberFormat('en-US', options).format(curr)
}