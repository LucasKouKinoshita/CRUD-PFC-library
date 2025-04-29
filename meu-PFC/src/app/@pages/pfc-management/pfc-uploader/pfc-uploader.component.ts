import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PopoverModule } from 'primeng/popover';
import { FileUploadModule } from 'primeng/fileupload';
import { FloatLabel } from 'primeng/floatlabel';
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

@Component({
  selector: 'app-pfc-uploader',
  standalone: true,
  imports: [
    ButtonModule,
    PopoverModule,
    FileUploadModule,
    ReactiveFormsModule,
    FloatLabel,
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
    private readonly fb: FormBuilder
  ) {
    this.form = new FormGroup({
      title: new FormControl(),
      author: new FormControl(),
      orientator: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.form = this.fb.nonNullable.group({
      title: ['', [Validators.required, Validators.required]],
      author: ['', [Validators.required, Validators.required]],
      orientator: ['', [Validators.required, Validators.required]],
    });
  }

  onPdfSelect(event: any): void {
    if (!this.form.valid) {
      return;
    }
    const rawForm = this.form.getRawValue();
    const file: File = event.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = (reader.result as string).split(',')[1]; // remove o prefixo "data:application/pdf;base64,"

      this.pfcService
        .addPfc(base64String, rawForm.title, rawForm.orientator, rawForm.author)
        .then(() => {
          // Sucesso!
          console.log('Trabalho enviado com sucesso!');
        })
        .catch((err) => {
          // Erro
          console.error('Erro ao enviar trabalho:', err);
        });
    };

    reader.readAsDataURL(file);
  }
}
