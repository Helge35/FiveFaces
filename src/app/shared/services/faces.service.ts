import { Injectable } from "@angular/core";
import { Face } from "../models/face";

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

    getResult(): Face {
        return this.items[0];
    }
}

