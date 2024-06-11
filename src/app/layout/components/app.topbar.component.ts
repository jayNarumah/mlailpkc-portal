import {
    Component,
    ElementRef,
    ViewChild,
    computed,
    signal,
    input,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../service/app.layout.service';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { AppAuthActions } from '../../store/auth/auth.action';
import { AuthLoggedInUserDto } from 'src/api/models/auth.request';
import { UserNotificationResource } from 'src/environments/api/models/user-notification.model';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrl: './app.topbar.component.scss',
})
export class AppTopBarComponent {
    items!: MenuItem[];
    notificationItems = input<UserNotificationResource[]>([]);
    selectedNotification!: MenuItem;
    user = signal<AuthLoggedInUserDto>(this.authService.user);
    name = computed(() => {
        const name = this.user().full_name.split(' ');

        return name[0];
    });

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        private readonly appStore: Store<AppState>,
        private readonly router: Router,
        private readonly authService: AuthService
    ) { }

    ngOnInit() {
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
                        command: () => {
                            this.goToFaqs();
                        },
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
        this.appStore.dispatch(AppAuthActions.logout());
        this.router.navigate(['/auth/login']);
    }

    onNotificationSelect(event: any) {
        // this.router.navigate(['/']);
    }

    goToProfile() {
        this.router.navigate([`/modules/profile`]);
    }

    goToFaqs() {
        this.router.navigate([`/modules/faqs`]);
    }
}
