import { Component, OnInit } from '@angular/core';
import { Page } from "tns-core-modules/ui/page";
import { Router } from "@angular/router";

@Component({
  selector: 'ns-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.css']
})
export class GreetingComponent implements OnInit {

  constructor( private page: Page,private router: Router ) {

    setTimeout(() => {
      this.router.navigate(['/faces']);
    }, 1000);
   }

  ngOnInit(): void {
    this.page.actionBarHidden = true;
  }

}
