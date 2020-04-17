import { Component, OnInit } from '@angular/core';
import { Page } from "tns-core-modules/ui/page";
import { Router } from "@angular/router";

import { FacesService } from "../shared/services/faces.service";
import {FilesService} from "../shared/services/files.service"
import { Face } from '../shared/models/face';

@Component({
  selector: 'ns-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  public faces: Array<Face>;

  constructor(private page: Page, private router: Router, private faceService: FacesService, private fileService: FilesService) { }
  
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

  public exportImg(): void{
   var exportedSrc= this.faceService.exportImg(this.faces);
   this.faces.push(new Face(100, exportedSrc));
   this.fileService.saveImage(exportedSrc);
  }
}
