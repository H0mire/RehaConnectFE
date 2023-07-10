//Component und OnInit wird aus dem Angular-Core importiert
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

//Eigenschaft names Test vom Datentyp Date wird deklariert, um aktuelles Datum und Uhrzeit zu speichern
export class FooterComponent implements OnInit {
  test: Date = new Date();

  constructor() { }

  ngOnInit() {
  }

}
