import { Component, OnInit } from '@angular/core';
import { Page } from "tns-core-modules/ui/page";
import { Router } from "@angular/router";

@Component({
  selector: 'ns-faces',
  templateUrl: './faces.component.html',
  styleUrls: ['./faces.component.css']
})
export class FacesComponent implements OnInit {

  constructor( private page: Page,private router: Router ) {}

  ngOnInit(): void {
   // this.page.actionBarHidden = true;
  }

}
