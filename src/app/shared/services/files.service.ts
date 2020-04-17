import { Injectable } from "@angular/core";
import { Face } from "../models/face";
import { isAndroid } from "tns-core-modules/platform";
import { ImageSource, fromNativeSource } from '@nativescript/core/image-source';
import * as fs from "tns-core-modules/file-system";


@Injectable({
    providedIn: "root"
})
export class FilesService {

     saveImage(source: ImageSource): void {
        var knownPath = fs.knownFolders.currentApp();
        var folderPath = fs.path.join(knownPath.path, "CosmosDataBank");

        var folder = fs.Folder.fromPath(folderPath);
        var path = fs.path.join(folderPath, "Test.png");

        var saved = source.saveToFile(path, "png");
        console.log(knownPath);
    }

}