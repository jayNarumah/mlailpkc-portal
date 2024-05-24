import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';


@Component({
    selector: 'app-content-header',
    standalone: true,
    imports: [BreadcrumbModule, RouterModule],
    templateUrl: './content-header.component.html',
    styleUrl: './content-header.component.scss'
})
export class ContentHeaderComponent implements OnInit {
    items: MenuItem[] | undefined;

    home: MenuItem | undefined;

    ngOnInit() {
        this.items = [
            { label: 'Home', icon: 'pi pi-home', route: '/installation' },
            { label: 'Components', icon: 'pi pi-home' },
            { label: 'Form', icon: 'pi pi-home' },
            { label: 'InputText', icon: 'pi pi-home', route: '/inputtext' }];
    }

}
