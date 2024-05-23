import { Component } from '@angular/core';
import { UiModule } from 'src/app/ui/ui.module';
import { HeaderPageComponent } from '../../../pages/landing/header-page/header-page.component';
import { SharedModule } from 'src/app/shared.module';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ConfirmationService } from 'primeng/api';
import { CourseScheduleResource } from 'src/api/resources/course-schedule.model';
import { CourseScheduleEndpoint } from 'src/api/endpoints/course/course-schedule.endpoint';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { AppLoadingService } from 'src/app/store/services/app-loading.service';
import { AppNotificationService } from 'src/app/store/services/app-notification.service';

@Component({
    selector: 'app-course-schedules-list-page',
    standalone: true,
    imports: [FormsModule, InputGroupModule, InputGroupAddonModule, UiModule, SharedModule, HeaderPageComponent],
    templateUrl: './course-schedules-list-page.component.html',
    styleUrl: './course-schedules-list-page.component.scss'
})
export class CourseSchedulesListPageComponent {
    rating = 5;
    filterChoice = '';
    courseCategories = ['Online', 'In-Online'];
    courses: CourseScheduleResource[] = [];
    is_loading = true;

    responsiveOptions: any[];

    constructor(
        private appNotificationService: AppNotificationService,
        private appLoadingService: AppLoadingService,
        private courseScheduleEndpoint: CourseScheduleEndpoint,
        private appStore: Store<AppState>,
    ) { }

    ngOnInit() {
        this.appLoadingService.startLoading('fetching . . .');
        this.courseScheduleEndpoint.list().subscribe({
            next: (response) => {
                this.courses = response.data;
                this.is_loading = false;
                this.appLoadingService.stopLoading();
            },
            error: (err) => {
                console.log(err);
                this.appLoadingService.stopLoading();

            }
        });
        this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 3,
                numScroll: 3
            },
            {
                breakpoint: '768px',
                numVisible: 2,
                numScroll: 2
            },
            {
                breakpoint: '560px',
                numVisible: 1,
                numScroll: 1
            }
        ];
    }
}
