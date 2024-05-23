import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    {
                        label: 'Dashboard', icon: 'assets/images/icons/dashboard.png', height: '25', padding: 'pt-2 pl-2', routerLink: ['/modules']
                    }
                ]
            },
            {
                label: 'UI Components',
                items: [
                    { label: 'Courses', icon: 'assets/images/icons/layers-2.png', height: '25', padding: 'pt-2 pl-2', routerLink: ['/modules/course-schedule/list'] },
                    // { label: 'Input', icon: 'assets/images/icons/layers-2.png', height: '25', padding: 'pt-2 pl-2', routerLink: ['/uikit/input'] },
                    // { label: 'Float Label', icon: 'assets/images/icons/layers-2.png', height: '25', padding: 'pt-2 pl-2', routerLink: ['/uikit/floatlabel'] },
                    // { label: 'Invalid State', icon: 'assets/images/icons/layers-2.png', height: '25', padding: 'pt-2 pl-2', routerLink: ['/uikit/invalidstate'] },
                    // { label: 'Button', icon: 'assets/images/icons/layers-2.png', height: '25', padding: 'pt-2 pl-2', routerLink: ['/uikit/button'] },
                    // { label: 'Table', icon: 'assets/images/icons/layers-2.png', height: '25', padding: 'pt-2 pl-2', routerLink: ['/uikit/table'] },
                    // { label: 'List', icon: 'assets/images/icons/layers-2.png', height: '25', padding: 'pt-2 pl-2', routerLink: ['/uikit/list'] },
                    // { label: 'Tree', icon: 'assets/images/icons/layers-2.png', height: '25', padding: 'pt-2 pl-2', routerLink: ['/uikit/tree'] },
                    // { label: 'Panel', icon: 'assets/images/icons/layers-2.png', height: '25', padding: 'pt-2 pl-2', routerLink: ['/uikit/panel'] },
                    // { label: 'Overlay', icon: 'assets/images/icons/layers-2.png', height: '25', padding: 'pt-2 pl-2', routerLink: ['/uikit/overlay'] },
                    // { label: 'Media', icon: 'assets/images/icons/layers-2.png', height: '25', padding: 'pt-2 pl-2', routerLink: ['/uikit/media'] },
                    // { label: 'Menu', icon: 'assets/images/icons/layers-2.png', height: '25', padding: 'pt-2 pl-2', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },
                    // { label: 'Message', icon: 'assets/images/icons/layers-2.png', height: '25', padding: 'pt-2 pl-2', routerLink: ['/uikit/message'] },
                    // { label: 'File', icon: 'assets/images/icons/layers-2.png', height: '25', padding: 'pt-2 pl-2', routerLink: ['/uikit/file'] },
                    // { label: 'Chart', icon: 'assets/images/icons/layers-2.png', height: '25', padding: 'pt-2 pl-2', routerLink: ['/uikit/charts'] },
                    // { label: 'Misc', icon: 'assets/images/icons/layers-2.png', height: '25', padding: 'pt-2 pl-2', routerLink: ['/uikit/misc'] }
                ]
            },
            // {
            //     label: 'Prime Blocks',
            //     items: [
            //         { label: 'Free Blocks', icon: 'assets/images/icons/layers-2.png', height: '25', padding: 'pt-2 pl-2', routerLink: ['/blocks'], badge: 'NEW' },
            //         { label: 'All Blocks', icon: 'assets/images/icons/layers-2.png', height: '25', padding: 'pt-2 pl-2', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank' },
            //     ]
            // },
            // {
            //     label: 'Utilities',
            //     items: [
            //         { label: 'PrimeIcons', icon: 'assets/images/icons/layers-2.png', height: '25', padding: 'pt-2 pl-2', routerLink: ['/utilities/icons'] },
            //         { label: 'PrimeFlex', icon: 'assets/images/icons/layers-2.png', height: '25', padding: 'pt-2 pl-2', url: ['https://www.primefaces.org/primeflex/'], target: '_blank' },
            //     ]
            // },
            // {
            //     label: 'Pages',
            //     icon: 'pi pi-fw pi-briefcase',
            //     items: [
            //         {
            //             label: 'Landing', icon: 'assets/images/icons/layers-2.png', height: '25', padding: 'pt-2 pl-2', routerLink: ['/landing']
            //         },
            //         {
            //             label: 'Auth',
            //             icon: 'pi pi-fw pi-user',
            //             items: [
            //                 {
            //                     label: 'Login', icon: 'assets/images/icons/layers-2.png', height: '25', padding: 'pt-2 pl-2', routerLink: ['/auth/login']
            //                 },
            //                 {
            //                     label: 'Error', icon: 'assets/images/icons/layers-2.png', height: '25', padding: 'pt-2 pl-2', routerLink: ['/auth/error']
            //                 },
            //                 {
            //                     label: 'Access Denied', routerLink: ['/auth/access']
            //                 }
            //             ]
            //         },
            //         {
            //             label: 'Crud', icon: 'assets/images/icons/layers-2.png', height: '25', padding: 'pt-2 pl-2', routerLink: ['/pages/crud']
            //         },
            //         {
            //             label: 'Timeline', icon: 'assets/images/icons/layers-2.png', height: '25', padding: 'pt-2 pl-2', routerLink: ['/pages/timeline']
            //         },
            //         {
            //             label: 'Not Found', icon: 'assets/images/icons/layers-2.png', height: '25', padding: 'pt-2 pl-2', routerLink: ['/notfound']
            //         },
            //         {
            //             label: 'Empty', icon: 'assets/images/icons/layers-2.png', height: '25', padding: 'pt-2 pl-2', routerLink: ['/pages/empty']
            //         },
            //     ]
            // },
            // {
            //     label: 'Hierarchy',
            //     items: [
            //         {
            //             label: 'Submenu 1', icon: 'assets/images/icons/layers-2.png', height: '25', padding: 'pt-2 pl-2',
            //             items: [
            //                 {
            //                     label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 1.1.1', icon: 'assets/images/icons/layers-2.png', height: '25', padding: 'pt-2 pl-2', },
            //                         { label: 'Submenu 1.1.2', icon: 'assets/images/icons/layers-2.png', height: '25', padding: 'pt-2 pl-2' },
            //                         { label: 'Submenu 1.1.3', icon: 'assets/images/icons/layers-2.png', height: '25', padding: 'pt-2 pl-2' },
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 1.2', icon: 'assets/images/icons/layers-2.png', height: '25', padding: 'pt-2 pl-2',
            //                     items: [
            //                         { label: 'Submenu 1.2.1', icon: 'assets/images/icons/layers-2.png', height: '25', padding: 'pt-2 pl-2' }
            //                     ]
            //                 },
            //             ]
            //         },
            //         {
            //             label: 'Submenu 2', icon: 'assets/images/icons/layers-2.png', height: '25', padding: 'pt-2 pl-2',
            //             items: [
            //                 {
            //                     label: 'Submenu 2.1', icon: 'assets/images/icons/layers-2.png', height: '25', padding: 'pt-2 pl-2',
            //                     items: [
            //                         { label: 'Submenu 2.1.1', icon: 'assets/images/icons/layers-2.png', height: '25', padding: 'pt-2 pl-2' },
            //                         { label: 'Submenu 2.1.2', icon: 'assets/images/icons/layers-2.png', height: '25', padding: 'pt-2 pl-2' },
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 2.2', icon: 'assets/images/icons/layers-2.png', height: '25', padding: 'pt-2 pl-2',
            //                     items: [
            //                         { label: 'Submenu 2.2.1', icon: 'assets/images/icons/layers-2.png', height: '25', padding: 'pt-2 pl-2' },
            //                     ]
            //                 },
            //             ]
            //         }
            //     ]
            // },
            // {
            //     label: 'Get Started',
            //     items: [
            //         {
            //             label: 'Documentation', icon: 'assets/images/icons/layers-2.png', height: '25', padding: 'pt-2 pl-2', routerLink: ['/documentation']
            //         },
            //         {
            //             label: 'View Source', icon: 'assets/images/icons/layers-2.png', height: '25', padding: 'pt-2 pl-2', url: ['https://github.com/primefaces/sakai-ng'], target: '_blank'
            //         }
            //     ]
            // }
        ];
    }
}
