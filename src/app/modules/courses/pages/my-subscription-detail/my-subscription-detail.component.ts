import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CourseFormat } from 'src/api/enums/course-format.enum';
import { CourseSubscriptionResource } from 'src/api/resources/course-subscription.model';
import { CourseSessionResource } from 'src/api/resources/session.model';
import { ContentHeaderComponent } from 'src/app/modules/pages/content-header/content-header.component';
import { UiModule } from 'src/app/ui/ui.module';

@Component({
    selector: 'app-my-subscription-detail',
    standalone: true,
    imports: [ContentHeaderComponent, UiModule],
    templateUrl: './my-subscription-detail.component.html',
    styleUrl: './my-subscription-detail.component.scss'
})
export class MySubscriptionDetailComponent implements OnInit {
    contentHeader: object;
    rating = 4;
    is_loading = signal<boolean>(true);
    dialogPosition = 'center';
    subscription = signal<CourseSubscriptionResource>(null);
    constructor(
        private route: ActivatedRoute,
        // private confirmationService: ConfirmationService,
        // private courseScheduleEndpoint: CourseScheduleEndpoint,
    ) { }

    ngOnInit(): void {
        this.contentHeader = [
            { label: 'Home', route: '/landing' },
            { label: 'Dasboard', route: '/modules' },
            { label: 'My Courses', route: '/modules/course-schedule/subscriptions' },
            { label: 'Details' },
        ];

        this.route.data
            .subscribe({
                next: (response: { data: CourseSubscriptionResource }) => {
                    this.subscription.set(response.data);
                    this.is_loading.set(false);
                },
                error: (err) => {
                    this.is_loading.set(false);
                }
            });
    }

    confirm(data: CourseSessionResource) {
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
        // this.confirmationService.confirm({
        //     header: 'Are you sure?',
        //     message: 'You want to subscribe to ' + this.course.code,
        //     accept: () => {
        //         console.log('Accept');
        //         this.appLoadingService.startLoading('Subscribing . . .');
        //         this.courseScheduleEndpoint.subscribe(data.uid).subscribe({
        //             next: (response) => {
        //                 this.appLoadingService.stopLoading();
        //                 this.appNotificationService.showSuccess({
        //                     title: 'Congratulations !',
        //                     detail: 'You have successfully subscribed to' + this.course.code,
        //                 })
        //             },
        //             error: (err) => {
        //                 this.appLoadingService.stopLoading();
        //                 console.log(err);

        //             }
        //         });

        //         // this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        //     },
        //     reject: () => {
        //         console.log('Reject');

        //         // this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        //     }
        // });
    }

    goBack() {
        window.history.back();
    }
}
