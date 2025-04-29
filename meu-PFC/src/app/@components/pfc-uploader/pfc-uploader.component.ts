import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PopoverModule } from 'primeng/popover';

@Component({
  selector: 'app-pfc-uploader',
  imports: [
    ButtonModule,
    PopoverModule
  ],
  templateUrl: './pfc-uploader.component.html',
  styleUrl: './pfc-uploader.component.css',
})
export class PfcUploaderComponent {
  email: string = '';
  title: string = '';
  orientator: string = '';
  /*
  authService = inject(AuthService);
  pfcService = inject(PfcService);

  onPdfSelect(event: any): void {
    const file: File = event.files[0];
    const reader = new FileReader();
  
    reader.onload = () => {
      const base64String = (reader.result as string).split(',')[1]; // remove o prefixo "data:application/pdf;base64,"
      
      this.pfcService.postPfc(
        this.email,
        this.title,
        this.orientator,
        base64String
      ).then(() => {
        console.log('Trabalho enviado com sucesso!');
      }).catch(() => {
        console.error('Erro ao enviar trabalho:');
      });
    };
  
    reader.readAsDataURL(file);
  }
  */
}
