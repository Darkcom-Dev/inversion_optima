
// Fusionar y ordenar los períodos
let allPeriods = Array.from(new Set([...values.periods, ...comparedValues.periods])).sort();

// Crear arrays de datos alineados con los períodos fusionados
let alignedFundValues = new Array(allPeriods.length).fill(null);
let alignedUnitsInCircualtion = new Array(allPeriods.length).fill(null);
let alignedInvestors = new Array(allPeriods.length).fill(null);
let alignedUnitValues = new Array(allPeriods.length).fill(null);
let alignedProfitability = new Array(allPeriods.length).fill(null);
let alignedVolatility = new Array(allPeriods.length).fill(null);
let alignedUnitsPerInvestor = new Array(allPeriods.length).fill(null);
let alignedFundValuesPerInvestor = new Array(allPeriods.length).fill(null);
let alignedTheoreticalValueFunds = new Array(allPeriods.length).fill(null);
let alignedProfitabilityDiffInflations = new Array(allPeriods.length).fill(null);
let alignedUnitValuesDiffInflations = new Array(allPeriods.length).fill(null);

// Llenar alignedValues con los datos del primer fondo
values.periods.forEach((period, index) => {
    let periodIndex = allPeriods.indexOf(period);
    alignedFundValues[periodIndex] = values.fund_values[index];
    alignedUnitsInCircualtion[periodIndex] = values.units_in_circulation[index];
    alignedInvestors[periodIndex] = values.investors[index];
    alignedUnitValues[periodIndex] = values.unit_values[index];
    alignedProfitability[periodIndex] = values.profitability[index];
    alignedVolatility[periodIndex] = values.volatility[index];
    alignedUnitsPerInvestor[periodIndex] = values.units_per_investor[index];
    alignedFundValuesPerInvestor[periodIndex] = values.fund_value_per_investor[index];
    alignedTheoreticalValueFunds[periodIndex] = values.theoretical_fund_value[index];
    alignedProfitabilityDiffInflations[periodIndex] = values.profitability_diff_inflation[index];
    alignedUnitValuesDiffInflations[periodIndex] = values.unit_values_diff_inflation[index];
});

let alignedComparedFundValues = new Array(allPeriods.length).fill(null);
let alignedComparedUnitsInCirculation = new Array(allPeriods.length).fill(null);
let alignedComparedInvestors = new Array(allPeriods.length).fill(null);
let alignedComparedUnitValues = new Array(allPeriods.length).fill(null);
let alignedComparedProfitability = new Array(allPeriods.length).fill(null);
let alignedComparedVolatility = new Array(allPeriods.length).fill(null);
let alignedComparedUnitsPerInvestor = new Array(allPeriods.length).fill(null);
let alignedComparedFundValuesPerInvestor = new Array(allPeriods.length).fill(null);
let alignedComparedTheoreticalFundValues = new Array(allPeriods.length).fill(null);
let alignedComparedProfitabilityDiffInflations = new Array(allPeriods.length).fill(null);
let alignedComparedUnitValuesDiffInflations = new Array(allPeriods.length).fill(null);

// Llenar alignedComparedValues con los datos del segundo fondo
comparedValues.periods.forEach((period, index) => {
    let periodIndex = allPeriods.indexOf(period);
    alignedComparedFundValues[periodIndex] = comparedValues.fund_values[index];
    alignedComparedUnitsInCirculation[periodIndex] = comparedValues.units_in_circulation[index];
    alignedComparedInvestors[periodIndex] = comparedValues.investors[index];
    alignedComparedUnitValues[periodIndex] = comparedValues.unit_values[index];
    alignedComparedProfitability[periodIndex] = comparedValues.profitability[index];
    alignedComparedVolatility[periodIndex] = comparedValues.volatility[index];  
    alignedComparedUnitsPerInvestor[periodIndex] = comparedValues.units_per_investor[index];
    alignedComparedFundValuesPerInvestor[periodIndex] = comparedValues.fund_value_per_investor[index];
    alignedComparedTheoreticalFundValues[periodIndex] = comparedValues.theoretical_fund_value[index];          
    alignedComparedProfitabilityDiffInflations[periodIndex] = comparedValues.profitability_diff_inflation[index];
    alignedComparedUnitValuesDiffInflations[periodIndex] = comparedValues.unit_values_diff_inflation[index];
});

const medianUnitValueLineData = new Array(allPeriods.length).fill(stats.unit_value_avg);
const meanProfitabilityLineData = new Array(allPeriods.length).fill(stats.profitability_avg);

drawComparativeChart('comparative_value_funds', 
    selectedFundName, 
    alignedFundValues, 
    comparedFundName, 
    alignedComparedFundValues, 
    'Valor del fondo en Miles de Millones', 
    'Miles de Millones');

drawComparativeChart('comparative_units_in_circulation', 
    selectedFundName, 
    alignedUnitsInCircualtion, 
    comparedFundName, 
    alignedComparedUnitsInCirculation, 
    'Unidades en circulación', 
    'Unidades');

drawComparativeChart('comparative_investors', 
    selectedFundName, 
    alignedInvestors, 
    comparedFundName, 
    alignedComparedInvestors, 
    'Cantidad de Inversionistas', 
    'Inversionistas');

drawComparativeChartWithMean('comparative_unit_values', 
    selectedFundName, 
    alignedUnitValues, 
    comparedFundName, 
    alignedComparedUnitValues, 
    medianUnitValueLineData,
    'Valor de la Unidad', 
    'COP por Unidad');

drawComparativeChartWithMean('comparative_profitability', 
    selectedFundName, 
    alignedProfitability, 
    comparedFundName, 
    alignedComparedProfitability, 
    meanProfitabilityLineData, 
    'Valor del fondo en Miles de Millones', 
    'Miles de Millones');

drawComparativeChart('comparative_volatility', 
    selectedFundName, 
    alignedVolatility, 
    comparedFundName, 
    alignedComparedVolatility, 
    'Volatilidad', 
    'Porcentaje');

drawComparativeChart('comparative_units_per_capita', 
    selectedFundName, 
    alignedUnitsPerInvestor, 
    comparedFundName, 
    alignedComparedUnitsPerInvestor, 
    'Unidades por persona', 
    'Unidades',
    true);

drawComparativeChart('comparative_unit_value_per_capita', 
    selectedFundName, 
    alignedFundValuesPerInvestor, 
    comparedFundName, 
    alignedComparedFundValuesPerInvestor, 
    'Valor del fondo por persona', 
    'Miles de Millones',
    true);

drawComparativeChart('comparative_teorical_value_fund', 
    selectedFundName, 
    alignedTheoreticalValueFunds, 
    comparedFundName, 
    alignedComparedTheoreticalFundValues, 
    'Valor teórico del fondo', 
    'Miles de Millones');

drawComparativeChart('comparative_profitability_diff_inflation', 
    'Rentabilidad Neta: ' + selectedFundName, 
    alignedProfitabilityDiffInflations, 
    'Rentabilidad Nominal: '+ selectedFundName,
    alignedProfitability,
    'Diferencia de rentabilidad VS Inflación', 
    'Porcentaje', fill=false, logarithmic=true);

drawComparativeChart('comparative_unit_values_diff_inflation', 
    'Valor Neta: ' + selectedFundName, 
    alignedUnitValuesDiffInflations, 
    'Valor Nominal:' + selectedFundName, 
    alignedUnitValues, 
    'Valor de la Unidad VS Inflación', 
    'Miles de Millones',fill=true);

