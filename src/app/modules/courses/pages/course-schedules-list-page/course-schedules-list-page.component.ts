import { Component, computed, signal } from '@angular/core';
import { RouterModule } from "@angular/router";
import { UiModule } from 'src/app/ui/ui.module';
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
import { ContentHeaderComponent } from '../../../pages/content-header/content-header.component';

@Component({
    selector: 'app-course-schedules-list-page',
    standalone: true,
    imports: [FormsModule, RouterModule, InputGroupModule, InputGroupAddonModule, UiModule, SharedModule, ContentHeaderComponent],
    templateUrl: './course-schedules-list-page.component.html',
    styleUrl: './course-schedules-list-page.component.scss'
})


export class CourseSchedulesListPageComponent {
    contentHeader: object;
    rating = 5;
    filterChoice = '';
    courseCategories = ['Online', 'In-Online'];
    _courses: CourseScheduleResource[] = [];
    courses = signal<CourseScheduleResource[]>([]);
    // courses = computed(() => this._courses());
    is_loading = signal(true);

    responsiveOptions: any[];

    constructor(
        private appNotificationService: AppNotificationService,
        private appLoadingService: AppLoadingService,
        private courseScheduleEndpoint: CourseScheduleEndpoint,
        private appStore: Store<AppState>,
    ) { }

    ngOnInit() {
        this.contentHeader = [
            { label: 'Home', route: '/landing' },
            { label: 'Dasboard', route: '/modules' },
            { label: 'Explore Courses' },
        ];
        // this.appLoadingService.startLoading('fetching . . .');
        this.courseScheduleEndpoint.list().subscribe({
            next: (response) => {
                this._courses = response.data;
                this.courses.set(this._courses);
                this.is_loading.set(false);
                // this.appLoadingService.stopLoading();
            },
            error: (err) => {
                console.log(err);
                this.is_loading.set(false);
                // this.appLoadingService.stopLoading();

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

    searchCourses(criteria: string) {
        const searchTerm = criteria.toLowerCase();

        this.courses.update(() => this._courses.filter(course => {
            const courseData = course.code.toLowerCase() + ' ' + course.name.toLowerCase() + ' ' + course.description.toLowerCase(); // Combine relevant fields
            return courseData.includes(searchTerm);
        }));
    }
}
