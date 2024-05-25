import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { ProductService } from 'src/app/demo/service/product.service';
import { CommonModule } from '@angular/common';
import { CourseScheduleResource } from 'src/api/resources/course-schedule.model';
import { CourseSubscriptionResource } from 'src/api/resources/course-subscription.model';
import { CourseFormat } from 'src/api/enums/course-format.enum';
import { SharedModule } from 'src/app/shared.module';
import { SkeletonModule } from 'primeng/skeleton';
import { ContentHeaderComponent } from 'src/app/modules/pages/content-header/content-header.component';
import { CourseScheduleEndpoint } from 'src/api/endpoints/course/course-schedule.endpoint';
import { AppLoadingService } from 'src/app/store/services/app-loading.service';
import { AppNotificationService } from 'src/app/store/services/app-notification.service';

@Component({
    selector: 'app-my-courses',
    standalone: true,
    imports: [
        CommonModule,
        DataViewModule,
        TagModule,
        RatingModule,
        ButtonModule,
        SkeletonModule,
        SharedModule,
        ContentHeaderComponent,
    ],
    templateUrl: './my-subscriptions.component.html',
    styleUrl: './my-subscriptions.component.scss'
})
export class MySubscriptionsComponent implements OnInit {
    contentHeader: object;
    layout: string = 'list';
    is_loading = signal<boolean>(true);
    subscriptions = signal<CourseSubscriptionResource[]>([
        {
            uid: 'uuid',
            status: 'APPROVED',
            created_at: new Date(),
            last_modified_at: new Date(),
            course_session_uid: 'uiuid',
            course_uid: 'course_uid',

            //relationships
            course: {
                uid: 'uuiiiid',
                code: 'Mlailpkc 0012',
                name: 'Mlailpkc 0012',
                description: 'description',
                capacity: 12,
                format: CourseFormat.IN_PERSON,
                enabled: true,
                created_at: new Date(),
                last_modified_at: new Date(),
                sessions: [],
                start_date: new Date(),
                end_date: new Date(),
                course_uid: 'course_uid',
            },
            course_session: {
                uid: 'string',
                course_uid: 'string',
                start_date: new Date(),
                end_date: new Date(),
            },
        },
        {
            uid: 'uuid',
            status: 'APPROVED',
            created_at: new Date(),
            last_modified_at: new Date(),
            course_session_uid: 'uiuid',
            course_uid: 'course_uid',

            //relationships
            course: {
                uid: 'uuiiiid',
                code: 'Mlailpkc 0012',
                name: 'Mlailpkc 0012',
                description: 'description',
                capacity: 12,
                format: CourseFormat.IN_PERSON,
                enabled: true,
                created_at: new Date(),
                last_modified_at: new Date(),
                sessions: [],
                start_date: new Date(),
                end_date: new Date(),
                course_uid: 'course_uid',
            },
            course_session: {
                uid: 'string',
                course_uid: 'string',
                start_date: new Date(),
                end_date: new Date(),
            },
        },
    ]);

    constructor(
        private readonly courseScheduleEndpoint: CourseScheduleEndpoint,
        private readonly appLoadingService: AppLoadingService,
        private readonly appNotificationService: AppNotificationService,
    ) { }

    ngOnInit(): void {
        this.contentHeader = [
            { label: 'Home', route: '/landing' },
            { label: 'Dasboard', route: '/modules' },
            { label: 'My Courses' },
        ];

        this.courseScheduleEndpoint.mySubscribtions().subscribe({
            next: (response) => {
                console.log(response.data);
                this.is_loading.set(false);
            },
            error: (err) => {
                console.log('Error', err);
                this.is_loading.set(false);
            }
        });
    }

    counterArray(n: number): any[] {
        return Array(n);
    }
}
