//let values = JSON.parse('{{ values|safe|escapejs }}');
//let compared_values = JSON.parse('{{ compared_values|safe|escapejs }}');

// Fusionar y ordenar los períodos
let allPeriods = Array.from(new Set([...values.periods, ...compared_values.periods])).sort();

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
compared_values.periods.forEach((period, index) => {
    let periodIndex = allPeriods.indexOf(period);
    alignedComparedValuesFundsMoM[periodIndex] = compared_values.value_funds_MoM[index];
    alignedComparedUnitsInCirculationMoM[periodIndex] = compared_values.units_in_circulation_MoM[index];
    alignedComparatedInvestorsMoM[periodIndex] = compared_values.investors_MoM[index];
    alignedComparedUnitValuesMoM[periodIndex] = compared_values.unit_values_MoM[index];
    alignedComparedProfitabilityMoM[periodIndex] = compared_values.profitability_MoM[index];
    alignedComparedVolatilityMoM[periodIndex] = compared_values.volatility_MoM[index];            
});
        
// Gráfica de valor de los fondos;
const ctx = document.getElementById('comparative_value_funds').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: allPeriods,
        datasets: [
            {
                label: selected_fund_name,
                data: alignedValuesFundsMoM,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: compared_fund_name,
                data: alignedComparedValuesFundsMoM,
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
                text: 'Valor del fondo en Miles de Millones'
            }
        },
        scales: {
            y: {
                beginAtZero: false
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
                label: selected_fund_name,
                data: alignedUnitsInCircualtionMoM,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: compared_fund_name,
                data: alignedComparedUnitsInCirculationMoM,
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
                text: 'Unidades en circulación'
            }
        },
        scales: {
            y: {
                beginAtZero: false
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
                label:selected_fund_name,
                data: alignedInvestorsMoM,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth:1
            },{
                label: compared_fund_name,
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
                beginAtZero:false
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
                label: selected_fund_name,
                data: alignedUnitValuesMoM,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: compared_fund_name,
                data: alignedComparedUnitValuesMoM,
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
                text: 'Valor de la unidad'
            }
        },
        scales: {
            y: {
                beginAtZero: false
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
                label: selected_fund_name,
                data: alignedProfitabilityMoM,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: compared_fund_name,
                data: alignedComparedProfitabilityMoM,
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
                text: 'Rendimiento'
            }
        },
        scales: {
            y: {
                beginAtZero: false
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
                label: selected_fund_name,
                data: alignedVolatilityMoM,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: compared_fund_name,
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
                beginAtZero: false
            }
        }
    }
});