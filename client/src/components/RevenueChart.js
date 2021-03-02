import React, { useEffect } from "react";
import Chart from "chart.js";

const RevenueChart = (props) => {

  useEffect(() => {
    var data = {
      type: 'bar',
      data: {
        labels: props.chartLabels,
        datasets: [
          {
            label: props.chartLabel,
            data: props.chartData,
            backgroundColor: 'Green',
            borderColor: "Green",
            borderWidth: 1
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
                return  props.yAxisLabel + ' ' + value;
            }
          }
        }]
      }
    }
  }
    const ctx = document.getElementById("revenueChart");
    new Chart(ctx, data);
  }
);
  
  return (
    <div className="RevenueChart">
      <canvas id="revenueChart" width="400" height="100" />
    </div>
  );
}

export default RevenueChart;
