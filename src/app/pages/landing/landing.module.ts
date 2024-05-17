import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { HeaderPageComponent } from './header-page/header-page.component';
import { UiModule } from 'src/app/ui/ui.module';

@NgModule({
    imports: [
        CommonModule,
        LandingRoutingModule,
        UiModule,
        HeaderPageComponent,
    ],
    declarations: [LandingComponent],
    exports: []
})
export class LandingModule { }
