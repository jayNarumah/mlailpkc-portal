import { NgModule } from "@angular/core";
import { NotfoundComponent } from "./notfound/notfound.component";
import { CommonModule } from "@angular/common";
import { UiModule } from "../ui/ui.module";
import { PagesRoutingModule } from "./pages-routing.module";

@NgModule({
    declarations: [NotfoundComponent],
    imports: [CommonModule, UiModule, PagesRoutingModule]
})

export class PagesModule { }
