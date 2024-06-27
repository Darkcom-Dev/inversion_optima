
// Fusionar y ordenar los períodos
let allPeriods = Array.from(new Set([...values.periods, ...comparedValues.periods])).sort();

// Crear arrays de datos alineados con los períodos fusionados
let alignedValuesFundsMoM = new Array(allPeriods.length).fill(null);
let alignedUnitsInCircualtionMoM = new Array(allPeriods.length).fill(null);
let alignedInvestorsMoM = new Array(allPeriods.length).fill(null);
let alignedUnitValuesMoM = new Array(allPeriods.length).fill(null);
let alignedProfitabilityMoM = new Array(allPeriods.length).fill(null);
let alignedVolatilityMoM = new Array(allPeriods.length).fill(null);

// Llenar alignedValues con los datos del primer fondo
values.periods.forEach((period, index) => {
    let periodIndex = allPeriods.indexOf(period);
    alignedValuesFundsMoM[periodIndex] = values.value_funds_MoM[index];
    alignedUnitsInCircualtionMoM[periodIndex] = values.units_in_circulation_MoM[index];
    alignedInvestorsMoM[periodIndex] = values.investors_MoM[index];
    alignedUnitValuesMoM[periodIndex] = values.unit_values_MoM[index];
    alignedProfitabilityMoM[periodIndex] = values.profitability_MoM[index];
    alignedVolatilityMoM[periodIndex] = values.volatility_MoM[index];
});

let alignedComparedValuesFundsMoM = new Array(allPeriods.length).fill(null);
let alignedComparedUnitsInCirculationMoM = new Array(allPeriods.length).fill(null);
let alignedComparatedInvestorsMoM = new Array(allPeriods.length).fill(null);
let alignedComparedUnitValuesMoM = new Array(allPeriods.length).fill(null);
let alignedComparedProfitabilityMoM = new Array(allPeriods.length).fill(null);
let alignedComparedVolatilityMoM = new Array(allPeriods.length).fill(null);

// Llenar alignedComparedValues con los datos del segundo fondo
comparedValues.periods.forEach((period, index) => {
    let periodIndex = allPeriods.indexOf(period);
    alignedComparedValuesFundsMoM[periodIndex] = comparedValues.value_funds_MoM[index];
    alignedComparedUnitsInCirculationMoM[periodIndex] = comparedValues.units_in_circulation_MoM[index];
    alignedComparatedInvestorsMoM[periodIndex] = comparedValues.investors_MoM[index];
    alignedComparedUnitValuesMoM[periodIndex] = comparedValues.unit_values_MoM[index];
    alignedComparedProfitabilityMoM[periodIndex] = comparedValues.profitability_MoM[index];
    alignedComparedVolatilityMoM[periodIndex] = comparedValues.volatility_MoM[index];            
});

const medianUnitValueLineData = new Array(allPeriods.length).fill(values.descriptive_unit_value.median);
const meanProfitabilityLineData = new Array(allPeriods.length).fill(values.descriptive_profitability.mean);

// Gráfica de valor de los fondos;
function drawComparativeChart(chartId, selectedLabel, selectedData, compareLabel, compareData, title, yAxisLabel) {
  const ctx = document.getElementById(chartId).getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: allPeriods,
      datasets: [{
        label: selectedLabel,
        data: selectedData,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      },
      {
        label: compareLabel,
        data: compareData,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: title
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: yAxisLabel
          }
        }
      }
    }
  });
}

function drawComparativeChartWithMean(chartElementId, selectedLabel, selectedData, compareLabel, compareData, meanData, chartTitle, yAxisLabel) {
  const chartElement = document.getElementById(chartElementId);
  const chart = new Chart(chartElement, {
    type: 'line',
    data: {
      labels: allPeriods,
      datasets: [
        {
          label: selectedLabel,
          data: selectedData,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: compareLabel,
          data: compareData,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: `Media de ${selectedLabel}`,
          data: meanData,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderWidth: 2,
          borderDash: [10, 5],
          fill: true
        }
      ]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: chartTitle
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: yAxisLabel
          }
        }
      }
    }
  });
}
    
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

drawComparativeChart('comparative_volatility', 
    selectedFundName, 
    alignedVolatilityMoM, 
    comparedFundName, 
    alignedComparedVolatilityMoM, 
    'Volatilidad', 
    'Porcentaje');

drawComparativeChart('comparative_unit_values', 
    selectedFundName, 
    alignedUnitValuesMoM, 
    comparedFundName, 
    alignedComparedUnitValuesMoM, 
    'Valor de la inversión', 
    'Miles de Millones');

drawComparativeChartWithMean('comparative_mean', 
    selectedFundName, 
    alignedValuesFundsMoM, 
    comparedFundName, 
    alignedComparedValuesFundsMoM, 
    alignedMeanValuesFundsMoM, 
    'Valor del fondo en Miles de Millones', 
    'Miles de Millones');