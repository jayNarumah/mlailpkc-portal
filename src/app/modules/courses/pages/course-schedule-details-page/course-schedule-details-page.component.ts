import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiModule } from 'src/app/ui/ui.module';
import { ActivatedRoute } from '@angular/router';
import { CourseScheduleResource } from 'src/api/resources/course-schedule.model';
import { ConfirmationService } from 'primeng/api';
import { AppNotificationService } from 'src/app/store/services/app-notification.service';
import { AppLoadingService } from 'src/app/store/services/app-loading.service';
import { CourseScheduleEndpoint } from 'src/api/endpoints/course/course-schedule.endpoint';
import { CourseSessionResource } from 'src/api/resources/session.model';
import { ContentHeaderComponent } from '../../../pages/content-header/content-header.component';
import { CourseSubscriptionResource } from 'src/api/resources/course-subscription.model';
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
    course = signal<CourseScheduleResource>(null);
    // mySubscriptions = signal<string[]>([]);
    mySubscriptions = signal<{ [key: string]: boolean }>({});
    subscriptions: CourseSubscriptionResource[] = [];

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

        //fetch the list of my subscriptions
        this.courseScheduleEndpoint.mySubscribtions().subscribe({
            next: (response) => {
                this.subscriptions = response.data;

                this.subscriptions.forEach(item => {
                    this.mySubscriptions()[item.course_session_uid] = true
                });
            },
            error: (err) => {
                console.log('Error', err);
                this.is_loading.set(false);
            }
        });

        this.route.data
            .subscribe({
                next: (response: { data: CourseScheduleResource }) => {
                    this.course.set(response.data);
                    this.is_loading.set(false);
                },
                error: (err) => {
                    this.is_loading.set(false);
                    this.appNotificationService.showError({
                        title: 'Oops !',
                        detail: 'Unnabled to fetch course details',
                    });
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
            message: 'You want to subscribe to ' + this.course().code,
            accept: () => {
                this.appLoadingService.startLoading('Subscribing . . .');
                this.courseScheduleEndpoint.subscribe(data.uid).subscribe({
                    next: (response) => {
                        this.mySubscriptions()[response.data.course_session_uid] = true;

                        this.appLoadingService.stopLoading();
                        this.appNotificationService.showSuccess({
                            title: 'Congratulations !',
                            detail: 'You have successfully subscribed to ' + this.course().code,
                        });
                    },
                    error: (err) => {
                        this.appLoadingService.stopLoading();
                        this.appNotificationService.showError({
                            title: 'Oops !',
                            detail: err,
                        });
                    }
                });

            },
            reject: () => {
                this.appNotificationService.showError({
                    title: 'Rejected !',
                    detail: 'Operation was rejected',
                });
            }
        });
    }

    goBack() {
        window.history.back();
    }
}
