import { Component } from '@angular/core';
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
    constructor(public router: Router, public readonly layoutService: LayoutService) { }

}
