
// Fusionar y ordenar los períodos
let allPeriods = Array.from(new Set([...values.periods, ...comparedValues.periods])).sort();

// Crear arrays de datos alineados con los períodos fusionados
let alignedValuesFundsMoM = new Array(allPeriods.length).fill(null);
let alignedUnitsInCircualtionMoM = new Array(allPeriods.length).fill(null);
let alignedInvestorsMoM = new Array(allPeriods.length).fill(null);
let alignedUnitValuesMoM = new Array(allPeriods.length).fill(null);
let alignedProfitabilityMoM = new Array(allPeriods.length).fill(null);
let alignedVolatilityMoM = new Array(allPeriods.length).fill(null);
let alignedUnitsPerCapitaMoM = new Array(allPeriods.length).fill(null);
let alignedFundValuesPerCapitaMoM = new Array(allPeriods.length).fill(null);
let alignedTeoricalValueFundsMoM = new Array(allPeriods.length).fill(null);
let alignedProfitabilityDiffInflationsMoM = new Array(allPeriods.length).fill(null);
let alignedUnitValuesDiffInflationsMoM = new Array(allPeriods.length).fill(null);

// Llenar alignedValues con los datos del primer fondo
values.periods.forEach((period, index) => {
    let periodIndex = allPeriods.indexOf(period);
    alignedValuesFundsMoM[periodIndex] = values.value_funds_MoM[index];
    alignedUnitsInCircualtionMoM[periodIndex] = values.units_in_circulation_MoM[index];
    alignedInvestorsMoM[periodIndex] = values.investors_MoM[index];
    alignedUnitValuesMoM[periodIndex] = values.unit_values_MoM[index];
    alignedProfitabilityMoM[periodIndex] = values.profitability_MoM[index];
    alignedVolatilityMoM[periodIndex] = values.volatility_MoM[index];
    alignedUnitsPerCapitaMoM[periodIndex] = values.units_per_capita_MoM[index];
    alignedFundValuesPerCapitaMoM[periodIndex] = values.fund_value_per_capita_MoM[index];
    alignedTeoricalValueFundsMoM[periodIndex] = values.teorical_value_fund_MoM[index];
    alignedProfitabilityDiffInflationsMoM[periodIndex] = values.profitability_diff_inflation_MoM[index];
    alignedUnitValuesDiffInflationsMoM[periodIndex] = values.unit_values_diff_inflation_MoM[index];
});

let alignedComparedValuesFundsMoM = new Array(allPeriods.length).fill(null);
let alignedComparedUnitsInCirculationMoM = new Array(allPeriods.length).fill(null);
let alignedComparatedInvestorsMoM = new Array(allPeriods.length).fill(null);
let alignedComparedUnitValuesMoM = new Array(allPeriods.length).fill(null);
let alignedComparedProfitabilityMoM = new Array(allPeriods.length).fill(null);
let alignedComparedVolatilityMoM = new Array(allPeriods.length).fill(null);
let alignedComparedUnitsPerCapitaMoM = new Array(allPeriods.length).fill(null);
let alignedComparedFundValuesPerCapitaMoM = new Array(allPeriods.length).fill(null);
let alignedComparedTeoricalValueFundsMoM = new Array(allPeriods.length).fill(null);
let alignedComparedProfitabilityDiffInflationsMoM = new Array(allPeriods.length).fill(null);
let alignedComparedUnitValuesDiffInflationsMoM = new Array(allPeriods.length).fill(null);

// Llenar alignedComparedValues con los datos del segundo fondo
comparedValues.periods.forEach((period, index) => {
    let periodIndex = allPeriods.indexOf(period);
    alignedComparedValuesFundsMoM[periodIndex] = comparedValues.value_funds_MoM[index];
    alignedComparedUnitsInCirculationMoM[periodIndex] = comparedValues.units_in_circulation_MoM[index];
    alignedComparatedInvestorsMoM[periodIndex] = comparedValues.investors_MoM[index];
    alignedComparedUnitValuesMoM[periodIndex] = comparedValues.unit_values_MoM[index];
    alignedComparedProfitabilityMoM[periodIndex] = comparedValues.profitability_MoM[index];
    alignedComparedVolatilityMoM[periodIndex] = comparedValues.volatility_MoM[index];  
    alignedComparedUnitsPerCapitaMoM[periodIndex] = comparedValues.units_per_capita_MoM[index];
    alignedComparedFundValuesPerCapitaMoM[periodIndex] = comparedValues.fund_value_per_capita_MoM[index];
    alignedComparedTeoricalValueFundsMoM[periodIndex] = comparedValues.teorical_value_fund_MoM[index];          
    alignedComparedProfitabilityDiffInflationsMoM[periodIndex] = comparedValues.profitability_diff_inflation_MoM[index];
    alignedComparedUnitValuesDiffInflationsMoM[periodIndex] = comparedValues.unit_values_diff_inflation_MoM[index];
});

const medianUnitValueLineData = new Array(allPeriods.length).fill(values.descriptive_unit_value.median);
const meanProfitabilityLineData = new Array(allPeriods.length).fill(values.descriptive_profitability.mean);

drawComparativeChart('comparative_value_funds', 
    selectedFundName, 
    alignedValuesFundsMoM, 
    comparedFundName, 
    alignedComparedValuesFundsMoM, 
    'Valor del fondo en Miles de Millones', 
    'Miles de Millones');

drawComparativeChart('comparative_units_in_circulation', 
    selectedFundName, 
    alignedUnitsInCircualtionMoM, 
    comparedFundName, 
    alignedComparedUnitsInCirculationMoM, 
    'Unidades en circulación', 
    'Unidades');

drawComparativeChart('comparative_investors', 
    selectedFundName, 
    alignedInvestorsMoM, 
    comparedFundName, 
    alignedComparatedInvestorsMoM, 
    'Cantidad de Inversionistas', 
    'Inversionistas');

drawComparativeChartWithMean('comparative_unit_values', 
    selectedFundName, 
    alignedUnitValuesMoM, 
    comparedFundName, 
    alignedComparedUnitValuesMoM, 
    medianUnitValueLineData,
    'Valor de la Unidad', 
    'COP por Unidad');

drawComparativeChartWithMean('comparative_profitability', 
    selectedFundName, 
    alignedProfitabilityMoM, 
    comparedFundName, 
    alignedComparedProfitabilityMoM, 
    meanProfitabilityLineData, 
    'Valor del fondo en Miles de Millones', 
    'Miles de Millones');

drawComparativeChart('comparative_volatility', 
    selectedFundName, 
    alignedVolatilityMoM, 
    comparedFundName, 
    alignedComparedVolatilityMoM, 
    'Volatilidad', 
    'Porcentaje');

drawComparativeChart('comparative_units_per_capita', 
    selectedFundName, 
    alignedUnitsPerCapitaMoM, 
    comparedFundName, 
    alignedComparedUnitsPerCapitaMoM, 
    'Unidades por persona', 
    'Unidades');

drawComparativeChart('comparative_unit_value_per_capita', 
    selectedFundName, 
    alignedFundValuesPerCapitaMoM, 
    comparedFundName, 
    alignedComparedFundValuesPerCapitaMoM, 
    'Valor del fondo por persona', 
    'Miles de Millones');

drawComparativeChart('comparative_teorical_value_fund', 
    selectedFundName, 
    alignedTeoricalValueFundsMoM, 
    comparedFundName, 
    alignedComparedTeoricalValueFundsMoM, 
    'Valor teórico del fondo', 
    'Miles de Millones');

    console.log("Valor de la Unidad: ", alignedUnitValuesMoM);
    console.log("Valor de la Unidad con inflación: ", alignedUnitValuesDiffInflationsMoM);

drawChart('comparative_profitability_diff_inflation', 
    selectedFundName, 
    alignedProfitabilityDiffInflationsMoM, 
    'Diferencia de rentabilidad VS Inflación', 
    'Porcentaje');

drawComparativeChart('comparative_unit_values_diff_inflation', 
    selectedFundName, 
    alignedUnitValuesDiffInflationsMoM, 
    comparedFundName, 
    alignedComparedUnitValuesDiffInflationsMoM, 
    'Valor de la Unidad VS Inflación', 
    'Miles de Millones');

