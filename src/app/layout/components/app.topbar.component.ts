import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "../service/app.layout.service";
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { AppAuthActions } from '../../store/auth/auth.action';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrl: './app.topbar.component.scss'
})
export class AppTopBarComponent {
    items!: MenuItem[];
    notificationItems!: MenuItem[];
    selectedNotification!: MenuItem;

    user = this.authService.user;

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        private readonly appStore: Store<AppState>,
        private readonly router: Router,
        private readonly authService: AuthService,
    ) {
    }

    ngOnInit() {
        this.notificationItems = [
            {
                label: 'MLAILPKC-001 Lecture is to be started today by 2:30pm',
                routerLink: '/notification/notifications',
            },
            {
                label: 'You have MLAILPKC-002 exam today by 12:30a.m',
                routerLink: '/notification/notifications',
            },
            {
                label: 'MLAILPKC-005 Lecture is to be started today by 2:30pm',
                routerLink: '/notification/notifications',
            },
        ];

        this.items = [
            {
                label: 'Links',
                items: [
                    {
                        label: 'My Profile',
                        icon: 'pi pi-user',
                        visible: true,
                        command: () => {
                            this.goToProfile();
                        },
                    },
                    {
                        label: 'Help',
                        icon: 'pi pi-question-circle',
                        url: '',
                    },
                    {
                        separator: true,
                    },
                    {
                        label: 'Log out',
                        icon: 'pi pi-sign-out',
                        command: () => {
                            this.logout();
                        },
                    },
                ],
            },
        ];
    }

    logout() {
        this.appStore.dispatch(AppAuthActions.logout())
        this.router.navigate(['/auth/budgeting/login']);
    }


    onNotificationSelect(event: any) {
        // this.router.navigate(['/']);
    }

    goToProfile() {
        this.router.navigate([`/`]);
    }
}
