import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import {GreetingComponent} from "./greeting/greeting.component";
import { FacesComponent} from "./faces/faces.component";
//import { ItemsComponent } from "./item/items.component";
//import { ItemDetailComponent } from "./item/item-detail.component";

const routes: Routes = [
   // { path: "", redirectTo: "/items", pathMatch: "full" },
   // { path: "items", component: ItemsComponent },
   // { path: "item/:id", component: ItemDetailComponent }
   { path: "", redirectTo: "/greeting", pathMatch: "full" },
   { path: "greeting", component: GreetingComponent },
   { path: "faces", component: FacesComponent },
];

export const navigatableComponents = [
    GreetingComponent,
    FacesComponent
  ];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
