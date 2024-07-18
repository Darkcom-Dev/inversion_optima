
function drawChart(chartId, selectedLabel, selectedData, title, yAxisLabel, logarithmScale = false, fill=false) {
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
          borderWidth: 1,
          fill: fill?true : false
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
            type: logarithmScale ? 'logarithmic' : 'linear',
            title: {
              display: true,
              text: yAxisLabel
            }
          }
        }
      }
    });
  }
  
  function drawComparativeChart(chartId, selectedLabel, selectedData, compareLabel, compareData, title, yAxisLabel, logarithmScale = false, fill=false) {
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
          borderWidth: 1,
          fill: fill?true : false
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
            type: logarithmScale ? 'logarithmic' : 'linear',
            title: {
              display: true,
              text: yAxisLabel
            }
          }
        }
      }
    });
  }
  
  function drawComparativeChartWithMean(chartElementId, selectedLabel, 
    selectedData, compareLabel, compareData, meanData, 
    chartTitle, yAxisLabel, 
    logarithmScale = false, 
    fill=false, 
    fillMean = false) {
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
            borderWidth: 1,
            fill: fill? true:false
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
            backgroundColor: 'rgba(255,132, 132, 0.2)',
            borderColor: 'rgba(255, 132, 132, 1)',
            borderWidth: 2,
            borderDash: [10, 5],
            fill:  fillMean ? true : false
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
            type: logarithmScale ? 'logarithmic' : 'linear',
            title: {
              display: true,
              text: yAxisLabel
            }
            
          }
        }
      }
    });
  }