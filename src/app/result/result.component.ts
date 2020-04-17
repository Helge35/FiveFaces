import { Component, OnInit } from '@angular/core';
import { Page } from "tns-core-modules/ui/page";
import { Router } from "@angular/router";

import { FacesService } from "../shared/services/faces.service";
import { Face } from '../shared/models/face';

@Component({
  selector: 'ns-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  public faces: Array<Face>;

  constructor(private page: Page, private router: Router, private faceService: FacesService) { }
  
  ngOnInit(): void {
    this.page.actionBarHidden = true;
    this.faces = this.faceService.getResult(3);
  }

  public backToFaces():void{
    this.router.navigate(['/faces']);
  }

  public cutImg(slices: number): void {
    this.faces = this.faceService.getResult(slices);
  }

}
