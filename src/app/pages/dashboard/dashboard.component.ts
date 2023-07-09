import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: string = 'puls';

  ngOnInit() {

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        enabled: true,
        mode: 'index',
        intersect: false,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.12)',
        backgroundColor: 'white',
        titleFontColor: 'rgba(0, 0, 0, 0.6)',
        bodyFontColor: 'rgba(0, 0, 0, 0.6)',
        footerFontColor: 'rgba(0, 0, 0, 0.6)'
      },
      scales: {
        xAxes: [{
          display: true,
          gridLines: {
            display: false
          },
          scaleLabel: {
            display: true,
            labelString: 'Category'
          }
        }],
        yAxes: [{
          display: true,
          gridLines: {
            display: true,
            color: 'rgba(0, 0, 0, 0.1)'
          },
          scaleLabel: {
            display: true,
            labelString: 'Value'
          },
          ticks: {
            beginAtZero: true,
            stepSize: 10 // Ändern Sie den Schritt der Skala nach Bedarf
          }
        }]
      }
    };

    const averagePulses = [80, 85, 90, 95, 100, 105];
    const speedData = [10, 12, 11, 13, 14, 15];

    this.salesChart = new Chart('chart-sales', {
      type: 'bar', // Verwenden Sie 'bar' für das vertikale Balkendiagramm
      options: {
        ...chartOptions,
        scales: {
          xAxes: [{
            ...chartOptions.scales.xAxes[0],
            ticks: {

            }
          }],
          yAxes: [{
            ...chartOptions.scales.yAxes[0],
            ticks: {
              ...chartOptions.scales.yAxes[0].ticks,
              fontSize: 14,
              padding: 40 // Ändern Sie den Abstand zwischen den y-Werten nach Bedarf
            }
          }]
        }
      },
      data: {
        labels: averagePulses.map((_, index) => `Minute ${index + 1}`),
        datasets: [{
          label: 'Durchschnittspuls',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          data: averagePulses
        }]
      }
    });

    this.datasets = [averagePulses, speedData];
    this.data = this.datasets[0];
  }

  public updateOptions() {
    if (this.clicked === 'puls') {
      const averagePulses = this.datasets[0];

      this.salesChart.data.labels = averagePulses.map((_, index) => `Minute ${index + 1}`);
      this.salesChart.data.datasets[0].data = averagePulses;
      this.salesChart.type = 'bar'; // Verwenden Sie 'bar' für das vertikale Balkendiagramm
    } else if (this.clicked === 'geschwindigkeit') {
      const speedData = this.datasets[1];

      this.salesChart.data.labels = speedData.map((_, index) => `Messung ${index + 1}`);
      this.salesChart.data.datasets[0].data = speedData;
      this.salesChart.type = 'line';
    }

    this.salesChart.update();
  }

}
