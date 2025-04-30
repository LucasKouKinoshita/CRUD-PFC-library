import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PfcService } from '../../../@services/pfc.service';
import { AuthService } from '../../../@services/auth.service';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-pfc-manager',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    FloatLabelModule,
    FileUploadModule
  ],
  templateUrl: './pfc-manager.component.html',
  styleUrl: './pfc-manager.component.css',
})
export class PfcManagerComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private readonly pfcService: PfcService,
    private readonly authService: AuthService,
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

  file!: File;
  fileContent: string = '';

  onPdfSelect(event: any): void {
    if (!this.form.valid) {
      return;
    }
    this.file = event.files[0];
  }

  onDelete() {}

  onUpdate() {}
}
