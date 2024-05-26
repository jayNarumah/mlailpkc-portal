import { Component, input } from '@angular/core';
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
    items = input<MenuItem[] | undefined>([]);


}
