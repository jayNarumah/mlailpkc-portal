import { Component, ElementRef, OnInit, ViewChild, signal } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ConfirmationService, MenuItem, Message } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { ProfileEndpoint } from 'src/api/endpoints/auth/profile.endpoint';
import { StudentCategoryEndpoint } from 'src/api/endpoints/student-category.endpoint';
import { MustMatch } from 'src/api/helpers/must-match.validator';
import { UpdatePasswordDto } from 'src/api/models/auth.request';
import { StudentCateogry } from 'src/api/models/student-category.model';
import { UserResource } from 'src/api/resources/user.model';
import { AppState } from 'src/app/store/app.state';
import { AppAuthActions } from 'src/app/store/auth/auth.action';
import { AppLoadingService } from 'src/app/store/services/app-loading.service';
import { AppNotificationService } from 'src/app/store/services/app-notification.service';
import { UiModule } from 'src/app/ui/ui.module';
import { ContentHeaderComponent } from '../content-header/content-header.component';

@Component({
    selector: 'app-profile-page',
    templateUrl: './profile-page.component.html',
    styleUrl: './profile-page.component.scss',
    standalone: true,
    imports: [UiModule, ReactiveFormsModule, ContentHeaderComponent]
})
export class ProfilePageComponent implements OnInit {

    @ViewChild('profilePhotoUpload', { static: false, read: ElementRef }) profilePhotoUpload!: ElementRef<FileUpload>;
    contentHeader: MenuItem[];
    // breadcrumbItems!: MenuItem[];
    items!: MenuItem[];
    is_loading = signal<boolean>(true);

    canSubmitNewPassword = false;
    canSubmitProfile = false;
    displayChangePassword = false;
    displayForm = false;
    showDetails = true;

    displayProfilePhotoDialog = false;
    displayRemoveProfilePhotoDialog = false;
    canUpload = false;

    msgs: Message[] = [];
    tab = 0;

    genders = ['Female', 'Male'];
    uploadedProfileImage: string | ArrayBuffer | null = null;
    profilePhotoFile?: string;

    studentCategories: StudentCateogry[] = [];
    studentCategory: StudentCateogry;

    changePasswordForm: FormGroup;

    userProfileForm: FormGroup;


    constructor(
        private readonly appStore: Store<AppState>,
        private readonly appLoadingService: AppLoadingService,
        private readonly appNotificationService: AppNotificationService,
        private readonly studentCategoryEndpoint: StudentCategoryEndpoint,
        private readonly confirmationService: ConfirmationService,
        private readonly fb: FormBuilder,
        private profileEndpoint: ProfileEndpoint,
    ) {
        this.changePasswordForm = this.fb.group({
            password: this.fb.control('', [Validators.required, Validators.minLength(4)]),
            new_password: this.fb.control('', [Validators.required, Validators.minLength(4)]),
            confirm_password: this.fb.control('', [Validators.required, Validators.minLength(4)]),
        }, { validator: MustMatch('new_password', 'confirm_password') });

        this.userProfileForm = this.fb.group({
            phone_number: this.fb.control(null, [Validators.minLength(11), Validators.maxLength(11)]),
        });
        // this.uploadedProfileImage = "assets/images/logos/profile-icon-9.png"
    }

    student!: UserResource;


    ngOnInit(): void {
        this.contentHeader = [
            { label: 'Home', route: '/landing' },
            { label: 'Dasboard', route: '/modules' },
            { label: 'Profile' },
        ];

        this.profileEndpoint.myProfile().subscribe({
            next: (data) => {
                this.student = data.data;
                this.is_loading.set(false);
                // this.appLoadingService.stopLoading();
            },
            error: (err) => {
                // this.appLoadingService.stopLoading();
                this.is_loading.set(false);
                this.appNotificationService.showError({ title: err });
            },
        });

        this.studentCategoryEndpoint.list()
            .subscribe({
                next: (response) => {
                    this.studentCategories = response.data;
                    this.studentCategory = this.studentCategories.find(student => student.uid === this.student.category_uid);
                },
                error: (error) => console.log(error),
            });




        this.changePasswordForm.statusChanges.subscribe({
            next: (status) => {
                console.log(status);
                console.log(this.changePasswordForm);

                this.canSubmitNewPassword = status === 'VALID' && this.changePasswordForm.valid
            }
        });

        this.userProfileForm.controls['phone_number'].valueChanges.subscribe({
            next: (txt) => console.log(txt)
        });
        this.userProfileForm.statusChanges.subscribe({
            next: (status) => {
                this.canSubmitProfile = status === 'VALID' && this.userProfileForm.valid
            }
        });

        this.items = [
            {
                label: 'Actions',
                items: [
                    {
                        label: 'View photo',
                        command: () => {
                            this.viewPhoto();
                        }
                    },
                    {
                        label: 'Upload photo',
                        command: () => {
                            this.uploadPhoto();
                        }
                    },
                    {
                        label: 'Remove photo',
                        command: () => {
                            this.displayRemoveProfilePhotoDialog = true;
                        }
                    }
                ]
            }
        ];
    }

    showUpdateForm() {
        this.displayChangePassword = false
        this.showDetails = false;
        this.displayForm = true;

        this.userProfileForm.controls['phone_number'].patchValue(this.student.phone_number);
    }

    showChangePasswordForm() {
        this.showDetails = false;
        this.displayForm = true;
        this.displayChangePassword = true;

        this.changePasswordForm.reset();
    }

    update() {
        const phone_number = this.userProfileForm.controls['phone_number'].value;
        this.appLoadingService.startLoading('Updating profile . . .');
        this.profileEndpoint.update(phone_number)
            .subscribe({
                next: (data) => {
                    this.student = { ...this.student, phone_number };
                    console.log(this.student);

                    this.appStore.dispatch(AppAuthActions.update(phone_number));

                    this.appLoadingService.stopLoading();
                    this.appNotificationService.showSuccess({ title: 'Operation successful', detail: 'Profile updated successfully' });
                    this.userProfileForm.reset();
                    this.showDetails = true;
                    this.displayForm = false;
                },
                error: (error) => {
                    this.appNotificationService.showError({ title: error.error, detail: error.message });
                    this.appLoadingService.stopLoading();
                }
            });
    }

    changePassword() {
        const payload: UpdatePasswordDto = {
            old_password: this.changePasswordFormControls['password'].value,
            new_password: this.changePasswordFormControls['new_password'].value,
        };
        this.appLoadingService.startLoading('Updating Password . . .');
        this.profileEndpoint.changePassword(payload)
            .subscribe({
                next: (data) => {
                    this.appLoadingService.stopLoading();
                    this.appNotificationService.showSuccess({ title: 'Operation successful', detail: 'Profile updated successfully' });
                    this.changePasswordForm.reset();
                    this.showDetails = true;
                    this.displayForm = false;
                },
                error: (error) => {
                    this.appNotificationService.showError({ title: error.error, detail: error.message });
                    this.appLoadingService.stopLoading();
                }
            });
    }

    cancel() {
        this.userProfileForm.reset();
        this.changePasswordForm.reset();
        this.showDetails = true;
        this.displayForm = false;
        this.canSubmitNewPassword = false
    }

    goBack() {
        window.history.back();
    }

    // reset password
    resetPassword() {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to reset this users password?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.appLoadingService.startLoading('Resetting Password');
                // const payload: any = {
                //     uid: this.user?.uid,
                // };
                // this.budgetingUserEndpoint.resetPassword(payload).subscribe({
                //     next: (data) => {
                //         this.appLoadingService.stopLoading();
                //         this.appNotificationService.showSuccess({
                //             title: 'Operation successful',
                //             detail: 'This Users Password has been Reset succesfully',
                //         });
                //         // const report: ReportModel = {
                //         //   status: true,
                //         //   message: "Password has been reset Successfully"
                //         // }
                //         // this.showDialog(report)
                //     },
                //     error: (error) => {
                //         this.appNotificationService.showError({
                //             title: error.status,
                //             detail: error.error.message,
                //         });
                //         this.appLoadingService.stopLoading();
                //         // const report: ReportModel = {
                //         //   status: false,
                //         //   message: "Password reset failed"
                //         // }
                //         // this.showDialog(report)
                //     },
                // });
            },
            reject: () => {
                this.appNotificationService.showWarning({ title: 'Canceled', detail: 'Operation has been canceled' });
            },
        });
    }


    handleProfilePhotoUpload(event: Event): void {
        const inputElement = event.target as HTMLInputElement;
        const files = inputElement.files;

        if (files && files.length > 0) {
            const file = files[0];
            // Handle the file upload logic here
        }
    }

    viewPhoto() {
        this.displayProfilePhotoDialog = true;
    }


    uploadPhoto() {
        const fileInput = this.profilePhotoUpload.nativeElement as unknown as HTMLInputElement;
        fileInput.click(); // Trigger the file selection dialog
    }

    handleFileUpload(event: Event) {
        const fileInput = event.target as HTMLInputElement;
        const file = fileInput.files?.[0]; // Get the selected file
        if (file) {
            // Perform the necessary actions with the uploaded file
            // You can call a separate function here to handle the upload logic
            this.handleUploadedFile(file);
        }
    }

    handleUploadedFile(file: File) {
        // Handle the uploaded file here

        const formData = new FormData();
        formData.append("file", file);
    }

    get changePasswordFormControls() {
        return this.changePasswordForm.controls;
    }
}

