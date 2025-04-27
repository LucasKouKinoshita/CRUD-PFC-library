import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router'; // Correct import of Router
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms'; 
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService } from '../../../@services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ButtonModule, RouterModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router); // Correctly injected Router

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', [Validators.required, Validators.required]],
  });
  errorMessage: string | null = null;

  onSubmit(): void {
    if (this.form.valid) {
      const rawForm = this.form.getRawValue();
      this.authService
        .login(rawForm.email, rawForm.password)
        .subscribe({
          next: () => {
            this.router.navigateByUrl('/home');
          },
          error: (err) => {
            this.errorMessage = err.code;
          },
        });
    }
  }
}
