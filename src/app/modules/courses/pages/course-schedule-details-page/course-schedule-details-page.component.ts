import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiModule } from 'src/app/ui/ui.module';
import { HeaderPageComponent } from '../../../../pages/landing/header-page/header-page.component';
import { ActivatedRoute } from '@angular/router';
import { CourseScheduleResource } from 'src/api/resources/course-schedule.model';
import { ConfirmationService } from 'primeng/api';
import { AppNotificationService } from 'src/app/store/services/app-notification.service';
import { AppLoadingService } from 'src/app/store/services/app-loading.service';
import { CourseScheduleEndpoint } from 'src/api/endpoints/course/course-schedule.endpoint';
import { CourseSessionResource } from 'src/api/resources/session.model';
import { ContentHeaderComponent } from '../../../pages/content-header/content-header.component';

@Component({
    selector: 'app-course-schedule-details-page',
    standalone: true,
    imports: [UiModule, ContentHeaderComponent, FormsModule],
    templateUrl: './course-schedule-details-page.component.html',
    styleUrl: './course-schedule-details-page.component.scss'
})
export class CourseScheduleDetailsPageComponent implements OnInit {
    contentHeader: object;
    rating = 4;
    is_loading = signal<boolean>(true);
    dialogPosition = 'center';
    course: CourseScheduleResource;
    constructor(
        private route: ActivatedRoute,
        private confirmationService: ConfirmationService,
        private appNotificationService: AppNotificationService,
        private appLoadingService: AppLoadingService,
        private courseScheduleEndpoint: CourseScheduleEndpoint,
    ) { }

    ngOnInit(): void {
        this.contentHeader = [
            { label: 'Home', route: '/landing' },
            { label: 'Dasboard', route: '/modules' },
            { label: 'Explore Courses', route: '/modules/course-schedule/list' },
            { label: 'Details' },
        ];

        this.route.data
            .subscribe({
                next: (response: { data: CourseScheduleResource }) => {
                    this.course = response.data;
                    this.is_loading.set(false);
                },
                error: (err) => {
                    this.is_loading.set(false);
                }
            });
    }

    confirm(data: CourseSessionResource, index: number) {
        // const modulus = (index + 1) % 3;

        // switch (modulus) {
        //     case 0:
        //         this.dialogPosition = 'right';
        //         break;
        //     case 1:
        //         this.dialogPosition = 'center';
        //         break;

        //     default:
        //         this.dialogPosition = 'center';
        //         break;
        // }
        this.confirmationService.confirm({
            header: 'Are you sure?',
            message: 'You want to subscribe to ' + this.course.code,
            accept: () => {
                console.log('Accept');
                this.appLoadingService.startLoading('Subscribing . . .');
                this.courseScheduleEndpoint.subscribe(data.uid).subscribe({
                    next: (response) => {
                        this.appLoadingService.stopLoading();
                        this.appNotificationService.showSuccess({
                            title: 'Congratulations !',
                            detail: 'You have successfully subscribed to' + this.course.code,
                        })
                    },
                    error: (err) => {
                        this.appLoadingService.stopLoading();
                        console.log(err);

                    }
                });

                // this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
            },
            reject: () => {
                console.log('Reject');

                // this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
            }
        });
    }

    goBack() {
        window.history.back();
    }
}
