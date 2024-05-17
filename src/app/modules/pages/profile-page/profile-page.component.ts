import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MenuItem, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { AppLoadingService } from 'src/app/store/services/app-loading.service';
import { AppNotificationService } from 'src/app/store/services/app-notification.service';
import { UiModule } from 'src/app/ui/ui.module';
import { UserEndpoint } from 'src/environments/api/endpoints/user.endpoint';

@Component({
    selector: 'app-profile-page',
    templateUrl: './profile-page.component.html',
    styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit {

    @ViewChild('profilePhotoUpload', { static: false, read: ElementRef }) profilePhotoUpload!: ElementRef<FileUpload>;

    breadcrumbItems!: MenuItem[];
    items!: MenuItem[];
    organizationUnits: any[] = [];
    skills: any[] = [];

    displayProfilePhotoDialog = false;
    displayRemoveProfilePhotoDialog = false;
    canUpload = false;

    canSubmit = false;
    canSubmitContact = false;
    canSubmitWork = false;
    canSubmitProfile = false;
    canAddSkill = false;

    editing = false;

    showDetails = true;
    displayForm = false;
    displayEditProfileForm = false;
    disabled = true;
    id!: string;
    deleteId!: number;
    msgs: Message[] = [];
    tab = 0;

    genders = [];
    uploadedProfileImage: string | ArrayBuffer | null = null;
    profilePhotoFile?: string;

    // message?: ReportModel;
    // visible = false;

    accessUserForm: FormGroup = this.fb.group({
        login_email: this.fb.control('', [Validators.required, Validators.email]),
    });

    userForm: FormGroup = this.fb.group({
        first_name: this.fb.control('', [Validators.required, Validators.minLength(3)]),
        last_name: this.fb.control('', [Validators.required, Validators.minLength(3)]),
        gender: this.fb.control('', []),
        birthday: this.fb.control('', []),
    });

    userContactForm: FormGroup = this.fb.group({
        phone: this.fb.control('', [Validators.minLength(11)]),
        address: this.fb.control('', [Validators.minLength(13)]),
        site: this.fb.control('', []),
        birthday: this.fb.control('', []),
    });

    userProfileForm: FormGroup = this.fb.group({
        phone: this.fb.control('', [Validators.minLength(11)]),
        address: this.fb.control('', [Validators.minLength(13)]),
        site: this.fb.control('', []),
        birthday: this.fb.control('', []),
        gender: this.fb.control('', []),
        skills: this.fb.control('', [])
    });

    userWorkForm: FormGroup = this.fb.group({
        organization: this.fb.control('', [Validators.minLength(11)]),
        address: this.fb.control('', [Validators.minLength(13)]),
        staff_code: this.fb.control('', [Validators.required, Validators.minLength(3)]),
        job_role: this.fb.control('', []),
    });


    constructor(
        private primengConfig: PrimeNGConfig,
        private readonly route: ActivatedRoute,
        private readonly appLoadingService: AppLoadingService,
        private readonly appNotificationService: AppNotificationService,
        private readonly confirmationService: ConfirmationService,
        private readonly budgetingUserEndpoint: UserEndpoint,
        private readonly messageService: MessageService,
        private readonly fb: FormBuilder,
        private readonly router: Router,
        private activatedRoute: ActivatedRoute,
    ) {

        // this.uploadedProfileImage = "assets/images/logos/profile-icon-9.png"
    }

    uid!: string;
    user!: any;
    displayLoadingModal = false;
    formPayload?: any;
    status = '';


    ngOnInit(): void {
        this.breadcrumbItems = [];
        this.breadcrumbItems.push({ label: 'Dashboard', routerLink: ['/module/dashboard/main'] });
        this.breadcrumbItems.push({ label: 'List of Users', routerLink: ['/module/user/users/list'] });
        this.breadcrumbItems.push({ label: 'User Details' });
        this.primengConfig.ripple = true;
        // this.route.data
        //   .subscribe({
        //     next: (data) => {
        //       this.user = data['record'];
        //       if (this.user.is_active) {
        //         this.status = 'Deactivate';
        //       } else {
        //         this.status = 'Activate';
        //       };
        //       this.organizationUnits = this.user?.organisationUnits ?? [];
        //     },
        //     error: (err) => {
        //       this.appNotificationService.showError({ title: err });
        //     },
        //   });

        this.activatedRoute.params.subscribe({
            next: (params) => {
                this.appLoadingService.startLoading('Loading Data...');
                this.uid = params['uid']
                // this.budgetingUserEndpoint.findByUid(this.uid).subscribe({
                //     next: (data) => {
                //         this.user = data;
                //         if (data.is_active) {
                //             this.status = 'Deactivate';
                //         } else {
                //             this.status = 'Activate';
                //         };
                //         this.uploadedProfileImage = data.profilePhoto?.imageUrl ?? '';
                //         this.appLoadingService.stopLoading();

                //         // Check Permissions
                //         // this._checkPermissions();
                //     },
                //     error: (error) => {
                //         this.appLoadingService.stopLoading();
                //         this.appNotificationService.showError({ title: error.error, detail: error.message });
                //     }

                // })
            },
            error: (error) => {
                this.appNotificationService.showError({ title: error.error, detail: error.message });
            }
        });



        this.userForm.statusChanges.subscribe({
            next: (status) => {
                this.canSubmit = status === 'VALID' && this.userForm.valid
            }
        });

        this.userProfileForm.statusChanges.subscribe({
            next: (status) => {
                this.canSubmitProfile = status === 'VALID' && this.userProfileForm.valid
            }
        });

        this.userContactForm.statusChanges.subscribe({
            next: (status) => {
                this.canSubmitContact = status === 'VALID' && this.userContactForm.valid
            }
        });

        this.userWorkForm.statusChanges.subscribe({
            next: (status) => {
                this.canSubmitWork = status === 'VALID' && this.userWorkForm.valid
            }
        });

        this.userProfileForm.controls['skills'].statusChanges.subscribe({
            next: (status) => {
                this.canAddSkill = status === 'VALID'
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
        const names = this.user.full_name.split(" ")
        this.appLoadingService.startLoading('Saving Data...');
        this.showDetails = false;
        this.displayForm = true;
        this.editing = true;
        this.id = this.user?.uid ?? '';
        this.accessUserForm.controls['login_email'].setValue(this.user.login?.username)
        this.userForm.controls['first_name'].setValue(names[0]);
        this.userForm.controls['last_name'].setValue(names[1]);
        this.userForm.controls['gender'].setValue(this.user.profile?.gender);
        this.userForm.controls['birthday'].setValue(this.user.profile?.birthday);
        this.userContactForm.controls['phone'].setValue(this.user.profile?.phone);
        this.userContactForm.controls['address'].setValue(this.user.profile?.contact_address);
        this.userContactForm.controls['site'].setValue(this.user.profile?.site);
        this.userContactForm.controls['birthday'].setValue(this.user.profile?.birthday);
        this.userWorkForm.controls['organization'].setValue(this.user.profile?.organization);
        this.userWorkForm.controls['address'].setValue(this.user.profile?.work_address);
        this.userWorkForm.controls['staff_code'].setValue(this.user?.staff_code);
        this.userWorkForm.controls['job_role'].setValue(this.user?.profile?.job_role);
        this.appLoadingService.stopLoading();
    }

    showProfileForm() {
        // this.appLoadingService.startLoading('Saving Data...');
        this.showDetails = false;
        this.displayForm = true;
        this.editing = true;
        this.id = this.user?.uid ?? '';
        this.userProfileForm.controls['gender'].setValue(this.user.profile?.gender);
        this.userProfileForm.controls['birthday'].setValue(this.user.profile?.birthday ? new Date(this.user.profile?.birthday) : null);
        this.userProfileForm.controls['phone'].setValue(this.user.profile?.phone);
        this.userProfileForm.controls['address'].setValue(this.user.profile?.contact_address);
        this.userProfileForm.controls['site'].setValue(this.user.profile?.site);
        this.appLoadingService.stopLoading();
    }

    update() {
        const formData: any = {
            full_name: this.user.full_name,
            staff_code: this.user.staff_code,
            organisation_unit_uids: [],
            security_group_uids: [],

            // Basic Information
            first_name: this.user.profile?.first_name || "",
            last_name: this.user.profile?.last_name || "",
            gender: this.userProfileForm.controls['gender'].value || "",
            birthday: this.userProfileForm.controls['birthday'].value || "",
            skills: this.skills,

            // Contact Information
            phone: this.userProfileForm.controls['phone'].value || "",
            contact_address: this.userProfileForm.controls['address'].value || "",
            site: this.userProfileForm.controls['site'].value || "",
            contact_birthday: this.user.profile?.contact_birthday || "",

            // Work Information
            organization: this.user.profile?.organization || "",
            work_address: this.user.profile?.work_address || "",
            job_role: this.user.profile?.job_role || ""


        };

        this.formPayload = formData;

        this.appLoadingService.startLoading('Saving Data...');
        // this.budgetingUserEndpoint.update(this.user.uid, this.formPayload)
        //     .subscribe({
        //         next: (data) => {
        //             this.user = data;
        //             this.appLoadingService.stopLoading();
        //             this.appNotificationService.showSuccess({ title: 'Operation successful', detail: 'Profile updated successfully' });
        //             this.userProfileForm.reset();
        //             this.showDetails = true;
        //             this.displayForm = false;
        //         },
        //         error: (error) => {
        //             this.appNotificationService.showError({ title: error.error, detail: error.message });
        //             this.appLoadingService.stopLoading();
        //         }
        //     });
    }

    cancel() {
        this.userForm.reset();
        this.showDetails = true;
        this.displayForm = false;
        this.editing = false
    }

    deleteItem() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this record?',
            header: 'Delete',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                // this.budgetingUserEndpoint.delete(this.user?.uid ?? '').subscribe({
                //     next: (data) => {
                //         this.messageService.clear('c');
                //         this.appNotificationService.showSuccess({ title: 'Operation successful', detail: 'User has been sucessfully deleted' });
                //         this.msgs = [{ severity: 'success', summary: 'Confirmed', detail: 'User has been sucessfully deleted' }];
                //         this.router.navigate(['/module/user/users/list'])
                //     },
                //     error: (error) => {
                //         this.appNotificationService.showError({ title: error.error.error, detail: error.error.message });
                //     }
                // })

            },
            reject: () => {
                this.appNotificationService.showWarning({ title: 'Operation has been canceled' });
            }
        });
    }

    statusUpdate(uid: string) {
        const payload: any = {
            user_uid: uid,
            is_active: !this.user.is_active
        };
        this.confirmationService.confirm({
            message: `Are you sure that you want to ${this.status} this user?`,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.appLoadingService.startLoading('Updating user');

                // this.budgetingUserEndpoint.updateActivationStatus(payload).subscribe({
                //     next: () => {
                //         this.appLoadingService.stopLoading();
                //         this.appNotificationService.showSuccess({
                //             title: 'Operation successful',
                //             detail: `This User has been successfully ${this.status}`,
                //         });
                //         this.user.is_active = !this.user.is_active;
                //     },
                //     error: (error) => {
                //         this.appNotificationService.showError({
                //             title: error.statusText,
                //             detail: error.error.message.message,
                //         });
                //         this.appLoadingService.stopLoading();
                //     },
                // });
            },
            reject: () => {
                this.appNotificationService.showWarning({ title: 'Operation has been canceled' });
            },
        });
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
                const payload: any = {
                    uid: this.user?.uid,
                };
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

    next() {
        this.tab++
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

    removeProfilePhoto(): void {
        this.displayRemoveProfilePhotoDialog = false;

        if (this.uploadedProfileImage === null || this.uploadedProfileImage === '' || this.uploadedProfileImage === undefined) {
            this.appNotificationService.showError({ title: 'No Image', detail: 'No profile photo to remove' });
            return; // Exit the method if uploadedProfileImage is null, empty, or undefined
        }

        // this.budgetingUserEndpoint.deleteProfilePic().subscribe({
        //     next: (response) => {
        //         this.user = response;
        //         this.uploadedProfileImage = response.profilePhoto?.imageUrl ?? '';
        //         this.appNotificationService.showSuccess({ title: 'Removed', detail: 'Profile photo has been removed successfully' });
        //     },
        //     error: (err) => {
        //     }
        // });
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

        // You can perform additional actions with the uploaded file, such as displaying it, sending it to the server, etc.
        // this.budgetingUserEndpoint.uploadProfilePic(formData).subscribe({
        //     next: (response) => {
        //         this.uploadedProfileImage = response.imageUrl; // Assuming the response has a property 'url' that represents the uploaded image URL
        //     },
        //     error: (err) => {
        //     }
        // });
    }

    // getting skill by index
    // getSkill(i: number) {
    //     const skill = this.skills[i];
    //     return skill.name;
    // }

    // adding skill
    // addSkill() {
    //     const skill: BudgetingUserSkillDto = {
    //         name: this.userProfileForm.controls['skills'].value
    //     }
    //     if (!skill.name || skill.name === '') {
    //         return
    //     }
    //     if (this.skills.length >= 9) {
    //         this.appNotificationService.showError({
    //             title: 'Max',
    //             detail: 'Maximum of 10 skills'
    //         })
    //     }
    //     this.skills.push(skill);
    //     this.userProfileForm.controls['skills'].reset();
    //     this.canAddSkill = false;
    // }

    // removing skill
    // removeSkill(i: number) {
    //     this.skills.splice(i, 1);
    // }
}

