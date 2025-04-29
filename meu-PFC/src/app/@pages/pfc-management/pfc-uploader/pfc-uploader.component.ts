import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PopoverModule } from 'primeng/popover';
import { FileUploadModule } from 'primeng/fileupload';
import { PfcService } from '../../../@services/pfc.service';

@Component({
  selector: 'app-pfc-uploader',
  standalone: true,
  imports: [ButtonModule, PopoverModule, FileUploadModule],
  templateUrl: './pfc-uploader.component.html',
  styleUrls: ['./pfc-uploader.component.css'], // <-- Fix here
})
export class PfcUploaderComponent {
  author: string = '';
  orientator: string = '';
  title: string = '';

  constructor(private readonly pfcService: PfcService) {}
  
  onPdfSelect(event: any): void {
    const file: File = event.files[0];
    const reader = new FileReader();
  
    reader.onload = () => {
      const base64String = (reader.result as string).split(',')[1]; // remove o prefixo "data:application/pdf;base64,"
      
      // Aqui você pode chamar o serviço para enviar ao Firebase
      this.pfcService.addPfc(
        base64String,
        this.title,
        this.orientator,
        this.author
      ).then(() => {
        // Sucesso!
        console.log('Trabalho enviado com sucesso!');
      }).catch((err) => {
        // Erro
        console.error('Erro ao enviar trabalho:', err);
      });
    };
  
    reader.readAsDataURL(file);
  }
}