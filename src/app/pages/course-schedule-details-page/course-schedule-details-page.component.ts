import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiModule } from 'src/app/ui/ui.module';
import { HeaderPageComponent } from '../landing/header-page/header-page.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-course-schedule-details-page',
    standalone: true,
    imports: [UiModule, HeaderPageComponent, FormsModule],
    templateUrl: './course-schedule-details-page.component.html',
    styleUrl: './course-schedule-details-page.component.scss'
})
export class CourseScheduleDetailsPageComponent implements OnInit {
    rating = 4;
    course = {
        uid: 'course-1',
        code: 'MlailKpc 001',
        name: 'Peace and Conflict Resolution',
        description: 'Peace and Conflict Resolution Description . . .',
        capacity: 20,
        format: 'In-Person',
        start_date: '05-22-2024',
        end_date: '05-22-2024',
    };
    constructor(
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.route.data
            .subscribe({
                next: (data) => {

                },
                error: (err) => {
                }
            });
    }
}
