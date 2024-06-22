
// Fusionar y ordenar los períodos
let allPeriods = Array.from(new Set([...values.periods, ...comparedValues.periods])).sort();

// Crear arrays de datos alineados con los períodos fusionados
let alignedValuesFundsMoM = new Array(allPeriods.length).fill(null);
let alignedUnitsInCircualtionMoM = new Array(allPeriods.length).fill(null);
let alignedComparedValuesFundsMoM = new Array(allPeriods.length).fill(null);
let alignedComparedUnitsInCirculationMoM = new Array(allPeriods.length).fill(null);
let alignedInvestorsMoM = new Array(allPeriods.length).fill(null);
let alignedComparatedInvestorsMoM = new Array(allPeriods.length).fill(null);
let alignedUnitValuesMoM = new Array(allPeriods.length).fill(null);
let alignedComparedUnitValuesMoM = new Array(allPeriods.length).fill(null);
let alignedProfitabilityMoM = new Array(allPeriods.length).fill(null);
let alignedComparedProfitabilityMoM = new Array(allPeriods.length).fill(null);
let alignedVolatilityMoM = new Array(allPeriods.length).fill(null);
let alignedComparedVolatilityMoM = new Array(allPeriods.length).fill(null);


const medianUnitValueLineData = new Array(allPeriods.length).fill(values.descriptive_unit_value.median);
const meanProfitabilityLineData = new Array(allPeriods.length).fill(values.descriptive_profitability.mean);


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
        
// Gráfica de valor de los fondos;
const ctx = document.getElementById('comparative_value_funds').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: allPeriods,
        datasets: [
            {
                label: selectedFundName,
                data: alignedValuesFundsMoM,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: comparedFundName,
                data: alignedComparedValuesFundsMoM,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
        ]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Valor del fondo en Miles de Millones'
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                title: {
                    display: true,
                    text: 'Valor en Miles de Millones'
                }
            }
        }
    }
});

// Gráfica de las unidades en circulacion
const ctx2 = document.getElementById('comparative_units_in_circulation').getContext('2d');
const myChart2 = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: allPeriods,
        datasets: [
            {
                label: selectedFundName,
                data: alignedUnitsInCircualtionMoM,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: comparedFundName,
                data: alignedComparedUnitsInCirculationMoM,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            
        ]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Unidades en circulación'
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                title: {
                    display: true,
                    text: 'Unidades'
                }
            }
        }
    }
});

const ctx3 = document.getElementById('comparative_investors').getContext('2d');
const myChart3 = new Chart(ctx3,{
    type:'line',
    data:{
        labels:allPeriods,
        datasets:[
            {
                label:selectedFundName,
                data: alignedInvestorsMoM,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth:1
            },{
                label: comparedFundName,
                data: alignedComparatedInvestorsMoM,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth:1
            }
        ]
    },
    options:{
        plugins: {
            title: {
                display: true,
                text: 'Cantidad de Inversionistas'
            }
        },
        
        scales:{
            y:{
                beginAtZero:false,
                title: {
                    display: true,
                    text: 'Inversionistas'
                }
            }
        }
    }
});

const ctx4 = document.getElementById('comparative_unit_values').getContext('2d');
const myChart4 = new Chart(ctx4, {
    type: 'line',
    data: {
        labels: allPeriods,
        datasets: [
            {
                label: selectedFundName,
                data: alignedUnitValuesMoM,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: comparedFundName,
                data: alignedComparedUnitValuesMoM,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
                label: 'Mediana de '+ selectedFundName,
                data: medianUnitValueLineData,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                //borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                borderDash: [10, 5], // Dibuja la línea discontinua
                fill: true // No rellena debajo de la línea
            }
        ]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Valor de la unidad'
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                title: {
                    display: true,
                    text: 'Valor de la unidad en pesos'
                }
            }
        }
    }
});

const ctx5 = document.getElementById('comparative_profitability').getContext('2d');
const myChart5 = new Chart(ctx5, {
    type: 'line',
    data: {
        labels: allPeriods,
        datasets: [
            {
                label: selectedFundName,
                data: alignedProfitabilityMoM,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: comparedFundName,
                data: alignedComparedProfitabilityMoM,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
                label: 'Std de '+ selectedFundName,
                data: meanProfitabilityLineData,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                //borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                borderDash: [10, 5], // Dibuja la línea discontinua
                fill: true // No rellena debajo de la línea
            }
        ]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Rendimiento'
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                title: {
                    display: true,
                    text: 'Rendimiento en porcentaje'
                }
            }
        }
    }
});

const ctx6 = document.getElementById('comparative_volatility').getContext('2d');
const myChart6 = new Chart(ctx6, {
    type: 'line',
    data: {
        labels: allPeriods,
        datasets: [
            {
                label: selectedFundName,
                data: alignedVolatilityMoM,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: comparedFundName,
                data: alignedComparedVolatilityMoM,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }
        ]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Volatilidad'
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                title: {
                    display: true,
                    text: 'Volatilidad en porcentaje'
                }
            }
        }
    }
});