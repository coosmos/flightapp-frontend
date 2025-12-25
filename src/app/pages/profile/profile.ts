import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserStoreService } from '../../services/user.store.service';
import { isValidPassword } from '../../shared/utils/password.utils';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile {

  userProfile = {
    username: '',
    email: ''
  };

  editMode = false;
  showChangePassword = false;

  editForm = {
    username: ''
  };

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

  usernameError = '';

  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private userStore: UserStoreService
  ) { }

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    // Get user details from store
    this.userProfile.username = this.userStore.getUser()?.username || 'User';
    this.userProfile.email = this.userStore.getEmail() || 'user@example.com';
  }

  enableEditMode() {
    this.editMode = true;
    this.editForm.username = this.userProfile.username;
    this.usernameError = '';
    this.clearMessages();
  }

  cancelEdit() {
    this.editMode = false;
    this.editForm = { username: '' };
    this.usernameError = '';
    this.clearMessages();
  }

  validateUsername(): boolean {
    if (!this.editForm.username.trim()) {
      this.usernameError = 'Username is required';
      return false;
    }

    if (this.editForm.username.trim().length < 3) {
      this.usernameError = 'Username must be at least 3 characters';
      return false;
    }

    this.usernameError = '';
    return true;
  }

  saveProfile() {
    this.clearMessages();

    if (!this.validateUsername()) {
      this.errorMessage = 'Please fix validation errors';
      return;
    }

    // If username hasn't changed, just close edit mode
    if (this.editForm.username === this.userProfile.username) {
      this.editMode = false;
      return;
    }

    this.loading = true;

    const payload = {
      newUsername: this.editForm.username
    };

    this.authService.changeUsername(payload).subscribe({
      next: (response: any) => {
        // Backend returns new JWT token
        if (response.token) {
          // Replace the old token with new token
          localStorage.setItem('token', response.token);
        }

        // Update username in store and local state
        localStorage.setItem('username', this.editForm.username);
        this.userStore.setUser({ username: this.editForm.username, email: this.userProfile.email });
        this.userProfile.username = this.editForm.username;

        this.successMessage = 'Username updated successfully';
        this.editMode = false;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to update username', err);
        if (err.status === 409) {
          this.errorMessage = 'Username already taken';
        } else {
          this.errorMessage = 'Failed to update username';
        }
        this.loading = false;
      }
    });
  }

  openChangePassword() {
    this.showChangePassword = true;
    this.passwordForm = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
    this.passwordErrors = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
    this.clearMessages();
  }

  closeChangePassword() {
    this.showChangePassword = false;
    this.passwordForm = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
    this.passwordErrors = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
  }

  validatePasswordForm(): boolean {
    let isValid = true;
    if (!this.passwordForm.oldPassword) {
      this.passwordErrors.oldPassword = 'Current password is required';
      isValid = false;
    } else {
      this.passwordErrors.oldPassword = '';
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
    } else {
      this.passwordErrors.newPassword = '';
    }
    if (!this.passwordForm.confirmPassword) {
      this.passwordErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
      this.passwordErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    } else {
      this.passwordErrors.confirmPassword = '';
    }

    return isValid;
  }

  changePassword() {
    this.clearMessages();

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
        // JWT remains valid - do NOT touch token, do NOT logout
        this.successMessage = 'Password changed successfully';
        this.showChangePassword = false;
        this.passwordForm = {
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        };
        this.loading = false;
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

  clearMessages() {
    this.successMessage = '';
    this.errorMessage = '';
  }
}