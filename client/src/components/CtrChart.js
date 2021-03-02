import React, { useEffect } from "react";
import Chart from "chart.js";

const CtrChart = (props) => {

  useEffect(() => {
    var data = {
      type: 'bar',
      data: {
        labels: props.chartLabels,
        datasets: [
          {
            label: props.chartLabel,
            data: props.chartData,
            backgroundColor: 'Yellow',
            borderColor: "Yellow",
            borderWidth: 1,
            yAxisID: 'left-y-axis',
            order: 2
          }, {
            label: props.chartLabel2,
            data: props.chartData2,
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderColor: "Blue",
            borderWidth: 2,
            type: 'line',
            yAxisID: 'right-y-axis',
            order: 1
          }
        ]
      },
      options: {
        scales: {
            yAxes: [{
                id: 'left-y-axis',
                type: 'linear',
                position: 'left',
                ticks: {
                  beginAtZero: true,
                  callback: function(value, index, values) {
                    return value + ' ' + props.leftYAxisLabel;
                }
              }
            }, {
                id: 'right-y-axis',
                type: 'linear',
                position: 'right',
                ticks: {
                  beginAtZero: true,
                  callback: function(value, index, values) {
                    return value + ' ' + props.rightYAxisLabel;
                }
              }
            }]
        }
    }
  }
    const ctx = document.getElementById("ctrChart");
    new Chart(ctx, data);
  }
);
  
  return (
    <div className="CtrChart">
      <canvas id="ctrChart" width="400" height="100" />
    </div>
  );
}

export default CtrChart;