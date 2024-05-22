import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { RegistrationEndpoint } from 'src/api/endpoints/auth/registration.endpoint';
import { StudentCategoryEndpoint } from 'src/api/endpoints/student-category.endpoint';
import { Gender } from 'src/api/enums/gender.enum';
import { ApiError } from 'src/api/models/api-interfaces';
import { SignupRequestDto } from 'src/api/models/api/registration.model';
import { ReportModel } from 'src/api/models/report.model';
import { StudentCateogry } from 'src/api/models/student-category.model';
import { AppLoadingService } from 'src/app/store/services/app-loading.service';
import { AppNotificationService } from 'src/app/store/services/app-notification.service';

@Component({
    selector: 'app-registration-page',
    templateUrl: './registration-page.component.html',
    styleUrl: './registration-page.component.scss'
})
export class RegistrationPageComponent implements OnInit {
    registrationForm: FormGroup;

    visible = false;
    message?: ReportModel;
    complete = false;
    declined = false;
    msg: Message[] = [];

    studentCategories: StudentCateogry[] = [];

    genders = [Gender.FEMALE, Gender.MALE];

    constructor(
        private readonly fb: FormBuilder,
        private readonly router: Router,
        private readonly appLoadingService: AppLoadingService,
        private readonly appNotificationService: AppNotificationService,
        private readonly studentCategoryEndpoint: StudentCategoryEndpoint,
        private readonly registrationEndpoint: RegistrationEndpoint,
    ) {
        this.registrationForm = this.fb.group({
            full_name: this.fb.control<string>('', [Validators.required]),
            email_address: this.fb.control<string>('', [Validators.required, Validators.email]),
            phone_number: this.fb.control<string>('', [Validators.required, Validators.minLength(11),]),
            gender: this.fb.control<string>('', [Validators.required]),
            category_uid: this.fb.control<string>('', [Validators.required]),
        });
    }

    ngOnInit(): void {
        this.studentCategoryEndpoint.list()
            .subscribe({
                next: (response) => this.studentCategories = response.data,
                error: (error) => console.log(error),
            });
    }

    get registrationFormControls() {
        return this.registrationForm.controls;
    }

    signup() {
        const gender: string = this.registrationFormControls['gender'].value;
        const formData: SignupRequestDto = {
            full_name: this.registrationFormControls['full_name'].value,
            email_address: this.registrationFormControls['email_address'].value,
            phone_number: this.registrationFormControls['phone_number'].value,
            gender: gender.toUpperCase(),
            category_uid: this.registrationFormControls['category_uid'].value,
        };
        this.appLoadingService.startLoading('Signup . . .');
        this.registrationEndpoint.signup(formData).subscribe({
            next: () => {
                this.appNotificationService.showSuccess({
                    title: 'Registration !',
                    detail: `was Successful`,
                });
                this.declined = false;

                this.router.navigate(['/auth/login']);
                // Show toast

                this.appLoadingService.stopLoading();
            },
            error: (error) => {
                this.appLoadingService.stopLoading();
                this.msg = error;
                console.log(this.msg);

                this.declined = true;
                this.appNotificationService.showError({
                    title: 'Oops !',
                    detail: error,
                });
            },
        });
    }

}
