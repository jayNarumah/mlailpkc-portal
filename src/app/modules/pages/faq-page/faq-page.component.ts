import { Component, OnInit, signal } from '@angular/core';
import { MenuItem, Message } from 'primeng/api';
import { StudentPortalFaqEndpoint } from 'src/api/endpoints/misc.endpoint';
import { StudentPortalFaq } from 'src/api/models/misc.model';
import { AppLoadingService } from 'src/app/store/services/app-loading.service';
import { UiModule } from 'src/app/ui/ui.module';
import { ContentHeaderComponent } from '../content-header/content-header.component';

@Component({
    templateUrl: './faq-page.component.html',
    styleUrl: './faq-page.component.scss',
    standalone: true,
    imports: [UiModule, ContentHeaderComponent],
})
export class FaqPageComponent implements OnInit {
    contentHeader: MenuItem[];
    // breadcrumbItems!: MenuItem[];
    is_loading = signal<boolean>(true);

    msgs: Message[] = [];
    tab = 0;

    // studentPortalFaqs: StudentPortalFaq[] = [];
    studentPortalFaqs = signal<StudentPortalFaq[]>([]);

    constructor(
        private readonly appLoadingService: AppLoadingService,
        private readonly studentPortalFaqEndpoint: StudentPortalFaqEndpoint
    ) { }

    ngOnInit(): void {
        this.contentHeader = [
            { label: 'Home', route: '/landing' },
            { label: 'Dasboard', route: '/modules' },
            { label: 'Help' },
        ];
        this.studentPortalFaqEndpoint.list().subscribe({
            next: (response) => {
                this.studentPortalFaqs.set(response.data);
                this.is_loading.update(() => false);
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
