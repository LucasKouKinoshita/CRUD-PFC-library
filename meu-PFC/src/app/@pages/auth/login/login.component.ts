import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms'; 
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService } from '../../../@services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ButtonModule, RouterModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{
  form!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly http: HttpClient,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.form = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  ngOnInit(): void {
    this.form = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.required]],
      password: ['', [Validators.required, Validators.required]],
    });
    if(this.authService.currentUserSig()){
        this.router.navigateByUrl('/home');
    }
  }

  errorMessage: string | null = null;

  onSubmit(): void {
    console.log('test')
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
