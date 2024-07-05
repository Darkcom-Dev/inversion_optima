let allPeriods = Array.from(new Set(values.periods)).sort();

let alignedFundValues = new Array(allPeriods.length).fill(null);
let alignedUnitsInCirculation = new Array(allPeriods.length).fill(null);
let alignedInvestors = new Array(allPeriods.length).fill(null);
let alignedUnitValues = new Array(allPeriods.length).fill(null);
let alignedProfitability = new Array(allPeriods.length).fill(null);
let alignedVolatility = new Array(allPeriods.length).fill(null);
let alignedUnitsPerInvestor = new Array(allPeriods.length).fill(null);
let alignedFundValuesPerInvestor = new Array(allPeriods.length).fill(null);
let alignedTheoreticalFundValues = new Array(allPeriods.length).fill(null);
let alignedProfitabilityDiffInflations = new Array(allPeriods.length).fill(null);
let alignedUnitValuesDiffInflations = new Array(allPeriods.length).fill(null);

values.periods.forEach((period, index) => {
    let periodIndex = allPeriods.indexOf(period);
    alignedFundValues[periodIndex] = values.fund_values[index];
    alignedUnitsInCirculation[periodIndex] = values.units_in_circulation[index];
    alignedInvestors[periodIndex] = values.investors[index];
    alignedUnitValues[periodIndex] = values.unit_values[index];
    alignedProfitability[periodIndex] = values.profitability[index];
    alignedVolatility[periodIndex] = values.volatility[index];
    alignedUnitsPerInvestor[periodIndex] = values.units_per_investor[index];
    alignedFundValuesPerInvestor[periodIndex] = values.fund_value_per_investor[index];
    alignedTheoreticalFundValues[periodIndex] = values.theoretical_fund_value[index];
    alignedProfitabilityDiffInflations[periodIndex] = values.profitability_diff_inflation[index];
    alignedUnitValuesDiffInflations[periodIndex] = values.unit_values_diff_inflation[index];
});

const medianUnitValueLineData = new Array(allPeriods.length).fill(stats.unit_value_avg);
const meanProfitabilityLineData = new Array(allPeriods.length).fill(stats.profitability_avg);

drawChart('fund_values', selectedFundName, alignedFundValues, 'Valor del Fondo', 'Miles de millones', false, true);