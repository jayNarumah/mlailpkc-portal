import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AppLayoutModule } from "../layout/app.layout.module";
import { ModulesRoutingModule } from "./modules-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { ProfilePageComponent } from "./pages/profile-page/profile-page.component";
import { UiModule } from "../ui/ui.module";

@NgModule({
    declarations: [ProfilePageComponent],
    imports: [CommonModule, ReactiveFormsModule, UiModule, AppLayoutModule, ModulesRoutingModule]
})

export class ModulesModule { }
