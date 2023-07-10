export interface Training {
	date: Date;
	durationInSeconds: number;
	maxPulse: number;
	minPulse: number;
	averagePulse: number;
	sumSteps: number;
	avgSpeed: number;
	spo2: number;
	idPatient: string;
}
