import { Injectable } from "@angular/core";
import { Face } from "../models/face";
import { FacePool } from "../models/facePool";
import { isAndroid } from "tns-core-modules/platform";
import { ImageSource, fromNativeSource } from '@nativescript/core/image-source';

var BitmapFactory = require("nativescript-bitmap-factory");
declare var UIImage;

@Injectable({
    providedIn: "root"
})
export class FacesService {
    private items: Array<Face> = [];
    public isPreview: boolean = false;
    public isCameraFront: boolean = false;

    getFaces(): Array<Face> {
        if (!this.isPreview) {
            return this.items;
        }
        else {
            return this.getPreviewImges();
        }
    }

    getPreviewImges(): Face[] {
        let faces: Face[] = [];
        let imSrc1 = new ImageSource();
        imSrc1.loadFromFile("~/app/images/f1.jpg");

        let imSrc2 = new ImageSource();
        imSrc2.loadFromFile("~/app/images/f2.jpg");

        let imSrc3 = new ImageSource();
        imSrc3.loadFromFile("~/app/images/f3.jpg");

        faces.push(new Face(1, imSrc1));
        faces.push(new Face(2, imSrc2));
        faces.push(new Face(3, imSrc3));
        return faces;
    }

    resetFaces(): void {
        this.items = [];
    }

    setFaces(faces: Array<Face>): void {
        this.items = faces;
    }

    getResult(slices: number): Array<Face> {
        let res: Array<Face> = [];
        let photosSlicesBuckets: FacePool[] = [];

        for (let sliceID = 0; sliceID < slices; sliceID++) {

            let singleImgRes: Array<ImageSource> = [];
            for (let photoID = 0; photoID < this.items.length; photoID++) {
                singleImgRes.push(this.cropImage(this.items[photoID].imageSrc, slices, sliceID));
            }

            photosSlicesBuckets.push(new FacePool(singleImgRes));
        }

        for (let x = 0; x < slices; x++) {
            let randomInd: number;

            randomInd = Math.floor(Math.random() * this.items.length);
            res.push(new Face(x, photosSlicesBuckets[x].imageSrc[randomInd]));
        }

        return res;
    }

    /*  resizePhoto(imageSource: ImageSource): any {
          let mutable = BitmapFactory.makeMutable(imageSource);
          let rotatedBitmap = BitmapFactory.asBitmap(mutable).dispose((bmp) => {
              return bmp.resize("400,400");
          });
  
          return rotatedBitmap.toImageSource();
      }*/

    /*  private getRandomIndex(sliceNum: number, usedRnd: Array<number>): number {
          let rnd = Math.floor(Math.random() * sliceNum);
          if (usedRnd.indexOf(rnd) >= 0) {
              return this.getRandomIndex(sliceNum, usedRnd);
          }
          return rnd;
      }*/


    private cropImage(image: ImageSource, sliceCount: number, index: number): ImageSource {
        let mutable = BitmapFactory.makeMutable(image);
        return BitmapFactory.asBitmap(mutable).dispose((bmp) => {

            let croppedImage = bmp.crop({ x: 0, y: (image.height / sliceCount) * index }, { width: image.width, height: image.height / sliceCount });

            return isAndroid ? croppedImage.toImageSource() :
                fromNativeSource(UIImage.alloc().initWithCGImage(croppedImage.nativeObject));
        });
    }

    private GetBitMap(image: ImageSource): any {
        let mutable = BitmapFactory.makeMutable(image);
        return BitmapFactory.asBitmap(mutable);
    }

    exportImg(faces: Array<Face>): ImageSource {
        let heightImg = faces.reduce((sum, face) => sum + face.imageSrc.height, 0)
        let widthImg = Math.max.apply(Math, faces.map(x => x.imageSrc.width));

        var bmp = BitmapFactory.create(widthImg, heightImg);
        for (let index = 0; index < faces.length; index++) {
            let bm = this.GetBitMap(faces[index].imageSrc);
            var imgPosition = (heightImg / faces.length) * index;
            bmp.insert(bm, "0," + String(imgPosition));
        }

        return bmp.toImageSource();
    }
}

