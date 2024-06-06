import { Component, OnInit, signal } from '@angular/core';
import { MenuItem, Message } from 'primeng/api';
import { StudentPortalFaqEndpoint } from 'src/api/endpoints/misc.endpoint';
import { StudentPortalFaq } from 'src/api/models/misc.model';
import { AppLoadingService } from 'src/app/store/services/app-loading.service';
import { UiModule } from 'src/app/ui/ui.module';

@Component({
    templateUrl: './faq-page.component.html',
    styleUrl: './faq-page.component.scss',
    standalone: true,
    imports: [UiModule],
})
export class FaqPageComponent implements OnInit {
    breadcrumbItems!: MenuItem[];

    msgs: Message[] = [];
    tab = 0;

    // studentPortalFaqs: StudentPortalFaq[] = [];
    studentPortalFaqs = signal<StudentPortalFaq[]>([]);

    constructor(
        private readonly appLoadingService: AppLoadingService,
        private readonly studentPortalFaqEndpoint: StudentPortalFaqEndpoint
    ) {}

    ngOnInit(): void {
        this.appLoadingService.startLoading('Fetching record . . .');

        this.studentPortalFaqEndpoint.list().subscribe({
            next: (response) => {
                this.studentPortalFaqs.set(response.data);
            },
            error: (error) => console.log(error),
            complete: () => {
                this.appLoadingService.stopLoading();
            },
        });
    }

    goBack() {
        window.history.back();
    }
}
