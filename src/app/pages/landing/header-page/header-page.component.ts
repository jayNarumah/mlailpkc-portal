import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { UiModule } from 'src/app/ui/ui.module';

@Component({
    selector: 'header-page',
    standalone: true,
    imports: [UiModule],
    templateUrl: './header-page.component.html',
    styleUrl: './header-page.component.scss'
})
export class HeaderPageComponent {

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        private readonly router: Router,
    ) {
    }

    ngOnInit() {

    }
}

