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
    private items = new Array<Face>();


    getFaces(): Array<Face> {
        return this.items;
    }
    resetFaces(): void {
        this.items = [];
    }

    setFaces(faces: Array<Face>): void {
        this.items = faces;
    }

    getResult(): Array<Face> {
        let res: Array<Face> = [];
        let sliceNum: number = this.items.length;
        let photosSlices: FacePool[] = [];

        for (let itemID = 0; itemID < sliceNum; itemID++) {
            let singleImgRes: Array<ImageSource> = [];
            for (let i = 0; i < sliceNum; i++) {
                singleImgRes.push(this.cropImage(this.items[itemID].imageSrc, sliceNum, i));
            }
            photosSlices.push(new FacePool(singleImgRes));
        }

        let usedRnd: Array<number> = [];
        for (let x = 0; x < sliceNum; x++) {
            let randomInd: number;

            randomInd = this.getRandomIndex(sliceNum, usedRnd);
            usedRnd.push(randomInd);

            res.push(new Face(x, photosSlices[randomInd].imageSrc[x]));
        }

        return res;
    }

    private getRandomIndex(sliceNum: number, usedRnd: Array<number>): number {
        let rnd = Math.floor(Math.random() * sliceNum);
        if (usedRnd.indexOf(rnd) >= 0) {
            return this.getRandomIndex(sliceNum, usedRnd);
        }
        return rnd;
    }

    private cropImage(image: ImageSource, sliceCount: number, index: number): ImageSource {
        let mutable = BitmapFactory.makeMutable(image);
        return BitmapFactory.asBitmap(mutable).dispose((bmp) => {

            let croppedImage = bmp.crop({ x: 0, y: (image.height / sliceCount) * index }, { width: image.width, height: image.height / sliceCount });

            return isAndroid ? croppedImage.toImageSource() :
                fromNativeSource(UIImage.alloc().initWithCGImage(croppedImage.nativeObject));
        });
    }

    /*cropImage(image: ImageSource): ImageSource {
        let mutable = BitmapFactory.makeMutable(image);
        return BitmapFactory.asBitmap(mutable).dispose((bmp) => {
            let croppedImage = bmp.crop({ x: 0, y: 0 }, { width: image.width, height: image.height/2 });
            return isAndroid ? croppedImage.toImageSource() :
                fromNativeSource(UIImage.alloc().initWithCGImage(croppedImage.nativeObject));
        });
    }*/
}

