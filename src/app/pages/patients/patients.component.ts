import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class Patients implements OnInit {

  public copy: string;
  constructor() { }

  ngOnInit() {
  }
  
  //Methode für das Klicken auf den Patienten
  TableClick(event: Event) {
    const target = event.target as HTMLElement;
    const rowData = target.closest('tr').textContent;
    console.log('Row clicked:');
  }
}
