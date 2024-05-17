import { NgModule } from "@angular/core";
import { NotfoundComponent } from "./notfound/notfound.component";
import { CommonModule } from "@angular/common";
import { UiModule } from "../ui/ui.module";
import { PagesRoutingModule } from "./pages-routing.module";
import { ProfilePageComponent } from "../modules/pages/profile-page/profile-page.component";

@NgModule({
    declarations: [NotfoundComponent, ProfilePageComponent],
    imports: [CommonModule, UiModule, PagesRoutingModule]
})

export class PagesModule { }
