import { Component, NgZone, OnInit } from '@angular/core';
import { Page } from "tns-core-modules/ui/page";
import { Router } from "@angular/router";
import { ImageAsset } from '@nativescript/core/image-asset';
import { ImageSource } from '@nativescript/core/image-source';
import { CameraPlus } from '@nstudio/nativescript-camera-plus';

import { FacesService } from "../shared/services/faces.service";
import { Face } from '../shared/models/face';


@Component({
  selector: 'ns-faces',
  templateUrl: './faces.component.html',
  styleUrls: ['./faces.component.css']
})
export class FacesComponent implements OnInit {
  public isPreview: boolean;
  private cam: CameraPlus;
  public faces: Array<Face>;

  constructor(private page: Page, private router: Router, private zone: NgZone, private faceService: FacesService) { }

  ngOnInit(): void {
    this.page.actionBarHidden = true;
    this.faces = this.faceService.getFaces();
    this.faceService.resetFaces();
    this.isPreview = this.faceService.isPreview;
  }

  public camLoaded(e: any): void {
    console.log('***** cam loaded *****');
    this.cam = e.object as CameraPlus;

    const flashMode = this.cam.getFlashMode();

    // Turn flash on at startup
    //if (flashMode === 'off') {
    //  this.cam.toggleFlash();
   // }
   const cameraSide = this.cam.getCurrentCamera();
   if (cameraSide == "rear") {
     this.cam.toggleCamera();
   }
    console.log('***** cam loaded end *****');
  }

  public imagesSelectedEvent(e: any): void {
    console.log('IMAGES SELECTED EVENT!!!');
    this.loadImage((e.data as ImageAsset[])[0]);
  }

  public photoCapturedEvent(e: any): void {
    console.log('PHOTO CAPTURED EVENT!!!');
    this.loadImage(e.data as ImageAsset);
  }


  public toggleFlashOnCam(): void {
    this.cam.toggleFlash();
  }

  public toggleShowingFlashIcon(): void {
    console.log(`showFlashIcon = ${this.cam.showFlashIcon}`);
    this.cam.showFlashIcon = !this.cam.showFlashIcon;
  }

  public toggleTheCamera(): void {
    this.cam.toggleCamera();
  }

  public openCamPlusLibrary(): void {
    this.cam.chooseFromLibrary();
  }

  public takePicFromCam(): void {
    this.cam.takePicture({ saveToGallery: true });
  }

  private loadImage(imageAsset: ImageAsset): void {
    if (imageAsset) {
      ImageSource.fromAsset(imageAsset).then(
        imgSrc => {
          if (imgSrc) {
            this.zone.run(() => {

              let ind: number = 1;
              if (this.faces.length > 0) {
                ind = Math.max.apply(Math, this.faces.map(function (o) { return o.id; })) + 1;
              }
              imgSrc = this.faceService.resizePhoto(imgSrc);
              this.faces.push(new Face(ind, imgSrc));
            });
          } else {
            this.faces = [];
            alert('Image source is bad.');
          }
        },
        err => {
          this.faces = [];
          console.log('Error getting image source: ');
          console.error(err);
          alert('Error getting image source from asset');
        }
      );
    } else {
      console.log('Image Asset was null');
      alert('Image Asset was null');
      this.faces = [];
    }
  }

  public deleteFace(id: number): void {
    this.faces = this.faces.filter(x => { return x.id != id; });
  }

  public create(): void {
    if (this.faces.length <= 2) {
      alert("Make more photos");
      return;
    }
    this.faceService.setFaces(this.faces);
    this.router.navigate(['/result']);
  }
}
