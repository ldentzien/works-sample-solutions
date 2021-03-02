import React, { useEffect } from "react";
import Chart from "chart.js";

const EventsChart = (props) => {

  useEffect(() => {
    var data = {
      type: 'line',
      data: {
        labels: props.chartLabels,
        datasets: [
          {
            label: props.chartLabel,
            data: props.chartData,
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderColor: "Red",
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
                return value + ' ' + props.yAxisLabel;
            }
          }
        }]
      }
    }
  }
    const ctx = document.getElementById("eventsChart");
    new Chart(ctx, data);
  }
);
  
  return (
    <div className="EventsChart">
      <canvas id="eventsChart" width="400" height="100" />
    </div>
  );
}

export default EventsChart;