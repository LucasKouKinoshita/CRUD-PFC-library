import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router'; // Correct import of Router
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService } from '../../../@services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true, // If the component is standalone
  imports: [ButtonModule, RouterModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'], // Ensure the correct path for styles
})
export class RegisterComponent implements OnInit{

  form!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly http: HttpClient,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.nonNullable.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.required]],
      password: ['', [Validators.required, Validators.required]],
    });
  }

  errorMessage: string | null = null;

  onSubmit(): void {
    if (this.form.valid) {
      const rawForm = this.form.getRawValue();
      this.authService
        .register(rawForm.email, rawForm.username, rawForm.password)
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
