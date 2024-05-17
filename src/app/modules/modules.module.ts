import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AppLayoutModule } from "../layout/app.layout.module";
import { ModulesRoutingModule } from "./modules-routing.module";

@NgModule({
    imports: [CommonModule, AppLayoutModule, ModulesRoutingModule]
})

export class ModulesModule { }
