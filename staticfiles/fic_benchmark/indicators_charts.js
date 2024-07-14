
let allPeriods = Array.from(new Set(indicators_dict.periods)).sort();
let inflation = new Array(allPeriods.length).fill(null);
let interestRates = new Array(allPeriods.length).fill(null);
allPeriods.forEach((period, index) => {
    inflation[index] = indicators_dict.inflation[index];
    interestRates[index] = indicators_dict.interest_rate[index];
});

drawComparativeChart('inflation_interest_rates', 
    'Inflacion', 
    inflation, 
    'Tasa de interés', 
    interestRates, 
    'Inflación VS Tasa de interés', 
    'Porcentaje');