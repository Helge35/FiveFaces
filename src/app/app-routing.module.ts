import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import {GreetingComponent} from "./greeting/greeting.component";
import { FacesComponent} from "./faces/faces.component";
import {ResultComponent} from './result/result.component';


const routes: Routes = [

   { path: "", redirectTo: "/greeting", pathMatch: "full" },
   { path: "greeting", component: GreetingComponent },
   { path: "faces", component: FacesComponent },
   { path: "result", component: ResultComponent },
];

export const navigatableComponents = [
    GreetingComponent,
    FacesComponent,
    ResultComponent,

  ];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
