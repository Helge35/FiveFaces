import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app/app.module";

platformNativeScriptDynamic({ bootInExistingPage:false, cssFile:"app.css" }).bootstrapModule(AppModule);
