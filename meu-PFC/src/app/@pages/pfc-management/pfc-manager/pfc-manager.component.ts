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
import { Pfc, PfcService } from '../../../@services/pfc.service';
import { AuthService } from '../../../@services/auth.service';
import { FileUploadModule } from 'primeng/fileupload';
import { DocumentData } from 'firebase/firestore';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-pfc-manager',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    FloatLabelModule,
    FileUploadModule,
    SelectModule
  ],
  templateUrl: './pfc-manager.component.html',
  styleUrl: './pfc-manager.component.css',
})
export class PfcManagerComponent implements OnInit {
  form!: FormGroup;
  email!: string;
  workList!: (DocumentData | (DocumentData & { id: string; }))[]
  selectedwork!: (DocumentData | (DocumentData & { id: string; }));

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

    const user = this.authService.currentUserSig();
    if (user) {
      this.email = user.email;
      console.log(this.email)
    }

    this.pfcService.getPfcs().subscribe(
      data => {
        this.workList = data.filter(item => item['email'] === this.email);
        //console.log(this.workList);
      }
    ) 
  }

  onWorkSelect(): void {
    if (this.selectedwork) {
      this.form.patchValue({
        title: this.selectedwork['title'] || '',
        author: this.selectedwork['author'] || '',
        orientator: this.selectedwork['orientator'] || ''
      });
    }
  }

  onUpdate(): void {
    if (!this.selectedwork || !('id' in this.selectedwork)) {
      console.error('No work selected');
      return;
    }
  
    if (!this.form.valid) {
      console.warn('Form is invalid');
      return;
    }
  
    const updatedData = {
      title: this.form.get('title')?.value,
      author: this.form.get('author')?.value,
      orientator: this.form.get('orientator')?.value,
    };
  
    this.pfcService.updatePfc(this.selectedwork.id, updatedData)
      .then(() => {
        console.log('Work updated successfully');
        // Refresh list if needed
      })
      .catch(err => console.error('Update failed', err));
  }
  
  onDelete(): void {
    if (!this.selectedwork || !('id' in this.selectedwork)) {
      console.error('No work selected');
      return;
    }
  
    this.pfcService.deletePfc(this.selectedwork.id)
      .then(() => {
        console.log('Work deleted successfully');
        this.workList = this.workList.filter(w => w.id !== this.selectedwork.id);
        this.selectedwork = undefined!;
        this.form.patchValue({
          title: '',
          author: '',
          orientator: ''
        });
      })
      .catch(err => console.error('Deletion failed', err));
  }
}
