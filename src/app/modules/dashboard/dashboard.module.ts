import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import { ContentHeaderComponent } from '../pages/content-header/content-header.component';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        SkeletonModule,
        ContentHeaderComponent,
        DashboardsRoutingModule
    ],
    declarations: [DashboardComponent]
})
export class DashboardModule implements OnInit {
    header: object;

    ngOnInit(): void {
        this.header = [

        ]
    }
}
