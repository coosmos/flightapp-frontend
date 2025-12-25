import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { isValidPassword } from '../../../shared/utils/password.utils';

@Component({
    selector: 'app-change-password',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './change-password.html',
    styleUrl: './change-password.css'
})
export class ChangePassword {
    passwordForm = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    };

    passwordErrors = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    };

    loading = false;
    errorMessage = '';
    successMessage = '';

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    validatePasswordForm(): boolean {
        let isValid = true;

        // reset errors
        this.passwordErrors = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        };

        if (!this.passwordForm.oldPassword) {
            this.passwordErrors.oldPassword = 'Current password is required';
            isValid = false;
        }

        if (!this.passwordForm.newPassword) {
            this.passwordErrors.newPassword = 'New password is required';
            isValid = false;
        } else if (!isValidPassword(this.passwordForm.newPassword)) {
            this.passwordErrors.newPassword = 'Password must be at least 6 characters and 1 number';
            isValid = false;
        } else if (this.passwordForm.newPassword === this.passwordForm.oldPassword) {
            this.passwordErrors.newPassword = 'New password must be different from current password';
            isValid = false;
        }

        if (!this.passwordForm.confirmPassword) {
            this.passwordErrors.confirmPassword = 'Please confirm your password';
            isValid = false;
        } else if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
            this.passwordErrors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }

        return isValid;
    }

    changePassword() {
        this.errorMessage = '';
        this.successMessage = '';

        if (!this.validatePasswordForm()) {
            return;
        }

        this.loading = true;

        const payload = {
            oldPassword: this.passwordForm.oldPassword,
            newPassword: this.passwordForm.newPassword
        };

        this.authService.changePassword(payload).subscribe({
            next: (response) => {
                this.successMessage = 'Password changed successfully. Redirecting...';
                this.loading = false;
                setTimeout(() => {
                    this.router.navigate(['/']);
                }, 1500);
            },
            error: (err) => {
                console.error('Failed to change password', err);
                if (err.status === 400 || err.status === 401) {
                    this.errorMessage = 'Current password is incorrect';
                } else {
                    this.errorMessage = 'Failed to change password';
                }
                this.loading = false;
            }
        });
    }
}
