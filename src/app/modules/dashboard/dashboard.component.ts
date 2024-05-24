import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../demo/api/product';
import { ProductService } from '../../demo/service/product.service';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { DashboardEndpoint } from 'src/api/endpoints/dashboard.endpoint';
import { DashboardStatsDto } from 'src/api/models/api/dashboard.model';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
    items!: MenuItem[];
    is_loading = signal<boolean>(true);
    products!: Product[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    dashboardStats?: DashboardStatsDto;

    recentNotifications: string[] = [];

    constructor(
        private productService: ProductService,
        public layoutService: LayoutService,
        private readonly dashboardEndpoint: DashboardEndpoint
    ) {
        this.subscription = this.layoutService.configUpdate$
            .pipe(debounceTime(25))
            .subscribe((config) => {
                this.initChart();
            });
    }

    ngOnInit() {
        this.initChart();
        // this.productService
        //     .getProductsSmall()
        //     .then((data) => (this.products = data));

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' },
        ];

        this.dashboardEndpoint.getDashboardStats().subscribe({
            next: (response) => {
                this.dashboardStats = response.data;
                this.dashboardStats?.latestCourses.forEach((course) =>
                    this.recentNotifications.push(course.course_name)
                );
                this.is_loading.set(false);
            },
            error: (error) => {
                alert('An error occurred while loading dashboard statistics!');
                this.is_loading.set(false);
            },
        });
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue(
            '--text-color-secondary'
        );
        const surfaceBorder =
            documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
            ],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor:
                        documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor:
                        documentStyle.getPropertyValue('--bluegray-700'),
                    tension: 0.4,
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor:
                        documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: 0.4,
                },
            ],
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
                y: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
            },
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
