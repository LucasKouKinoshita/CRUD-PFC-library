import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PopoverModule } from 'primeng/popover';
import { FileUploadModule } from 'primeng/fileupload';
import { PfcService } from '../../../@services/pfc.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pfc-uploader',
  standalone: true,
  imports: [
    ButtonModule,
    PopoverModule,
    FileUploadModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './pfc-uploader.component.html',
  styleUrls: ['./pfc-uploader.component.css'],
})
export class PfcUploaderComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private readonly pfcService: PfcService,
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {
    this.form = new FormGroup({
      title: new FormControl(),
      author: new FormControl(),
      orientator: new FormControl(),
    });
  }

  file!: File;
  fileContent: string = '';

  ngOnInit(): void {
    this.form = this.fb.nonNullable.group({
      title: ['', [Validators.required, Validators.required]],
      author: ['', [Validators.required, Validators.required]],
      orientator: ['', [Validators.required, Validators.required]],
      orientatorReview: ['', [Validators.required, Validators.required]],
    });
  }

  onPdfSelect(event: any): void {
    if (!this.form.valid) {
      return;
    }
    this.file = event.files[0];
  }

  postWork() {
    if (!this.form.valid) {
      return;
    }
    const reader = new FileReader();

    reader.onload = () => {
      const rawForm = this.form.getRawValue();

      const base64String = (reader.result as string).split(',')[1];

      this.pfcService
        .addPfc(base64String, rawForm.title, rawForm.orientator, rawForm.author, rawForm.orientatorReview)
        .then(() => {
          console.log('Trabalho enviado com sucesso!');
          this.router.navigateByUrl('/home');
        })
        .catch((err) => {
          console.error('Erro ao enviar trabalho:', err);
        });
    };

    reader.readAsDataURL(this.file);
  }
}
