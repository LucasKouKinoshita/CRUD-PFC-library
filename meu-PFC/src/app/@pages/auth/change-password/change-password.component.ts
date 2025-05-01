import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../@services/auth.service';
import { RouterModule, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, ButtonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    currentPassword: ['', Validators.required],
    newPassword: ['', Validators.required], 
  });

  errorMessage: string | null = null;
  successMessage: string | null = null;

  onSubmit(): void {
    if (this.form.valid) {
      const rawForm = this.form.getRawValue();
      this.authService.login(rawForm.email, rawForm.currentPassword).subscribe({
        next: () => {
          this.authService.changePassword(rawForm.newPassword, rawForm.currentPassword).subscribe({
            next: () => {
              this.successMessage = 'Changed password successfully!';
              this.errorMessage = null;
              this.form.reset();
              this.router.navigateByUrl('/home');
            },
            error: (err) => {
              this.errorMessage = typeof err === 'string' ? err : err.code || 'Erro desconhecido';
              this.successMessage = null;
            },
          });
        },
        error: (err) => {
          this.errorMessage = typeof err === 'string' ? err : err.code || 'Erro desconhecido';
          this.successMessage = null;
        }});
    }
  }
}
