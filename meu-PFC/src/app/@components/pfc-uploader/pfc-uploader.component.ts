import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PopoverModule } from 'primeng/popover';
import { PfcService } from '../../@services/pfc.service';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-pfc-uploader',
  standalone: true,
  imports: [ButtonModule, PopoverModule, FileUploadModule],
  templateUrl: './pfc-uploader.component.html',
  styleUrls: ['./pfc-uploader.component.css'], // <-- Fix here
})
export class PfcUploaderComponent {
  email: string = '';
  title: string = '';
  orientator: string = '';

  //constructor(private readonly pfcService: PfcService) {}
}