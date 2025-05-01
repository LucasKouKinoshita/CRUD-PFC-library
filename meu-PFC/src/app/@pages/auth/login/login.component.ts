import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
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
export class LoginComponent implements OnInit{
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router); 

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', [Validators.required, Validators.required]],
  });
  errorMessage: string | null = null;

  ngOnInit(): void {
      if(this.authService.currentUserSig()){
        this.router.navigateByUrl('/home');
      }
  }

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
