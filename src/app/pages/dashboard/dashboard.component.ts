import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { PulseData } from './pulse-data';
import { SpeedData } from './speed-data';
import { Training } from './training';


@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	public datasets: any;
	public data: any;
	public trainings:any;
	public salesChart;
	public clicked: string = 'puls';
	chartOptions: any;
  //Das angezeigte Training wird auf 0 gesetzt, damit die Felder überhaupt angezeigt werden
  public selectedTraining= {
    averagePulse: 0,
    spo2: 0,
    sumSteps: 0,
    avgSpeed: 0
  };
  

	constructor(private http: HttpClient) { }


	ngOnInit() {
    
//Die Felder werden beim Laden des Dashboards mit dem aktuellsten Training besetzt
    this.getData().then(() => {
      if (this.trainings.length > 0) {
        this.selectedTraining = {
          averagePulse: this.trainings[0].averagePulse,
          spo2: this.trainings[0].spo2,
          sumSteps: this.trainings[0].sumSteps,
          avgSpeed: this.trainings[0].avgSpeed
        };
      }
    });

    //Chart-Options des Graphen

		this.chartOptions = {
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
						stepSize: 10 
					}
				}]
			}
		};
		this.displayInfo();


	}
	private async displayInfo() {
		await this.getData();

		this.salesChart = new Chart('chart-sales', {
			type: 'line',
			options: { ...this.chartOptions },
			data: {
				labels: this.data.map(item => `Sekunde ${item.time}`),
				datasets: [
					{
						label: 'Wert',
						backgroundColor: 'rgba(255, 99, 132, 0.2)',
						borderColor: 'rgba(255, 99, 132, 1)',
						borderWidth: 1,
						data: this.datasets[0].map(item => ({ x: item.time, y: item.pulse }))
					}
				]
			}
		});
	}

  //Erhaalten der Trainingsliste aus dem Backend
	getTrainingList(): Promise<any> {
		return new Promise((resolve, reject) => {
			this.http.get<Training[]>('http://127.0.0.1:3001/app/trainings/').subscribe({
				next: (v) => {
					resolve(v);
				},
				error: (e) => {console.log(e);reject(e)},
				complete: () => console.info('complete')
			});
		});
	}

  //Erhalten der Pulsdaten aus dem Backend
	getPulseData(): Promise<any> {
		return new Promise((resolve, reject) => {
			this.http.get<PulseData>('http://127.0.0.1:3001/app/trainings/pulse/1').subscribe({
				next: (v) => {
					resolve(v);
				},
				error: (e) => {console.log(e);reject(e)},
				complete: () => console.info('complete')
			});
		});
	}

  //Erhalten der Geschwindigkeitsdaten aus dem Backend
	getSpeedData(): Promise<any> {
		return new Promise((resolve, reject) => {
			this.http.get<PulseData>('http://127.0.0.1:3001/app/trainings/speed/1').subscribe({
				next: (v) => {
					resolve(v);
				},
				error: (e) => {console.log(e);reject(e)},
				complete: () => console.info('complete')
			});
		});
	}


	private async getData() {
		const trainings = await this.getTrainingList();
		const pulseData = await this.getPulseData();
		const speedData = await this.getSpeedData();

		this.trainings = trainings;
		console.log(trainings);
		this.datasets = [pulseData, speedData];
		this.data = this.datasets[0];
    
	}

  //Update-Methode für den Chart beim Wechsel zwischen Puls und Geschwindigkeit
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

  //TableClick-Methode zum Auswählen der Trainings in der Tabelle unterhalb

  TableClick(event: any, training: any) {
    this.selectedTraining = training;
    console.log("TableClick wurde aufgerufen");
    console.log(training)

  }

}
