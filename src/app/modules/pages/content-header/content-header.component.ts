import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';


@Component({
    selector: 'app-content-header',
    standalone: true,
    imports: [BreadcrumbModule],
    templateUrl: './content-header.component.html',
    styleUrl: './content-header.component.scss'
})
export class ContentHeaderComponent {
    @Input({ required: true }) items: MenuItem[] | undefined;


}
