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
          type: 'linear',
          position: 'bottom',
          display: true,
          gridLines: {
            display: false
          },
          scaleLabel: {
            display: true,
            labelString: 'Trainingszeit in Sekunden'
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
            labelString: 'Schläge/Min'
          },
          ticks: {
            beginAtZero: true,
            stepSize: 10 // Ändern Sie den Schritt der Skala nach Bedarf
          }
        }]
      }
    };

    const pulseData = [
      { time: 0, pulse: 80 },
      { time: 1, pulse: 88 },
      { time: 2, pulse: 96 },
      { time: 3, pulse: 104 },
      { time: 4, pulse: 112 },
      { time: 5, pulse: 120 }
    ];

    const speedData = [
      { time: 0, speed: 15 },
      { time: 1, speed: 14 },
      { time: 2, speed: 16 },
      { time: 3, speed: 18 },
      { time: 4, speed: 16 },
      { time: 5, speed: 12 }
    ];
    
    this.datasets = [pulseData, speedData];
    this.data = this.datasets[0];

    this.salesChart = new Chart('chart-sales', {
      type: 'line',
      options: { ...chartOptions },
      data: {
        labels: this.data.map(item => `Sekunde ${item.time}`),
        datasets: [
          {
            label: 'Wert',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            data: pulseData.map(item => ({ x: item.time, y: item.pulse }))
          }
        ]
      }
    });

  }

  public updateOptions() {
    if (this.clicked === 'puls') {
      const averagePulses = this.datasets[0].map(item => item.pulse);

      this.salesChart.options.scales.yAxes[0].scaleLabel.labelString = 'Schläge/Min';
      this.salesChart.options.scales.yAxes[0].ticks.stepSize = 10;
      this.salesChart.options.scales.yAxes[0].ticks.callback = (value) => value;

      this.salesChart.data.datasets[0].data = averagePulses.map((value, index) => ({ x: index, y: value }));
      this.salesChart.data.labels = averagePulses.map((value, index) => ({ x: index, y: value }));
      this.salesChart.type = 'line';
    } else if (this.clicked === 'geschwindigkeit') {
      const speedData = this.datasets[1].map(item => item.speed);

      this.salesChart.options.scales.yAxes[0].scaleLabel.labelString = 'km/h';
      this.salesChart.options.scales.yAxes[0].ticks.stepSize = 1;
      this.salesChart.options.scales.yAxes[0].ticks.callback = (value) => value;

      this.salesChart.data.datasets[0].data = speedData.map((value, index) => ({ x: index, y: value }));
      this.salesChart.data.labels = speedData.map((value, index) => ({ x: index, y: value }));
      this.salesChart.type = 'line';
    }

    this.salesChart.update();
  }

  TableClick(event: Event) {
    const target = event.target as HTMLElement;
    const rowData = target.closest('tr').textContent;
    console.log('Row clicked:');
  }


}






