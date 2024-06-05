import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { AppMenuComponent } from './components/app.menu.component';
import { AppMenuitemComponent } from './components/app.menuitem.component';
import { RouterModule } from '@angular/router';
import { AppTopBarComponent } from './components/app.topbar.component';
import { AppFooterComponent } from './components/app.footer.component';
import { AppConfigModule } from './config/config.module';
import { AppSidebarComponent } from "./components/app.sidebar.component";
import { AppLayoutComponent } from "./app.layout.component";
import { MenuModule } from 'primeng/menu';
import { ChipModule } from 'primeng/chip';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { MessagesModule } from 'primeng/messages';
import { AvatarModule } from 'primeng/avatar';

@NgModule({
    declarations: [
        AppMenuitemComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppMenuComponent,
        AppSidebarComponent,
        AppLayoutComponent,
    ],
    exports: [AppLayoutComponent, AppTopBarComponent],
    imports: [
        CommonModule,
        FormsModule,
        InputTextModule,
        MenuModule,
        SidebarModule,
        ChipModule,
        TableModule,
        ButtonModule,
        OverlayPanelModule,
        MessagesModule,
        BadgeModule,
        RadioButtonModule,
        AvatarModule,
        InputSwitchModule,
        RippleModule,
        RouterModule,
        AppConfigModule], providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class AppLayoutModule { }
