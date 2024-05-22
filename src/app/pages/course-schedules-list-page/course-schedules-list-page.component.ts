import { Component } from '@angular/core';
import { UiModule } from 'src/app/ui/ui.module';
import { HeaderPageComponent } from '../landing/header-page/header-page.component';
import { SharedModule } from 'src/app/shared.module';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ConfirmationService } from 'primeng/api';
import { CourseScheduleResource } from 'src/api/resources/course-schedule.model';

@Component({
    selector: 'app-course-schedules-list-page',
    standalone: true,
    imports: [FormsModule, InputGroupModule, InputGroupAddonModule, UiModule, SharedModule, HeaderPageComponent],
    templateUrl: './course-schedules-list-page.component.html',
    styleUrl: './course-schedules-list-page.component.scss'
})
export class CourseSchedulesListPageComponent {
    rating = 5;
    dialogPosition = 'center';
    filterChoice = '';
    courseCategories = ['Online', 'In-Online'];
    courses = [
        {
            uid: 'course-1',
            code: 'MlailKpc 001',
            name: 'Peace and Conflict Resolution',
            description: 'Peace and Conflict Resolution Description . . .',
            capacity: 20,
            format: 'In-Person'
        },
        {
            uid: 'course-2',
            code: 'MlailKpc 002',
            name: 'Peace and Conflict Resolution',
            description: 'Peace and Conflict Resolution Description . . .',
            capacity: 40,
            format: 'Online'
        },
        {
            uid: 'course-3',
            code: 'MlailKpc 003',
            name: 'Peace and Conflict Resolution',
            description: 'Peace and Conflict Resolution Description . . .',
            capacity: 25,
            format: 'In-Person'
        },
        {
            uid: 'course-4',
            code: 'MlailKpc 004',
            name: 'Peace and Conflict Resolution',
            description: 'Peace and Conflict Resolution Description . . .',
            capacity: 55,
            format: 'In-Person'
        },
        {
            uid: 'course-5',
            code: 'MlailKpc 005',
            name: 'Peace and Conflict Resolution',
            description: 'Peace and Conflict Resolution Description . . .',
            capacity: 25,
            format: 'Online'
        },
    ];

    responsiveOptions: any[];

    constructor(
        private confirmationService: ConfirmationService,
    ) { }

    ngOnInit() {
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

    confirm(data, index: number) {
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
            message: 'You want to subscribe to ' + data.code,
            accept: () => {
                console.log('Accept');

                // this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
            },
            reject: () => {
                console.log('Reject');

                // this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
            }
        });
    }
}
