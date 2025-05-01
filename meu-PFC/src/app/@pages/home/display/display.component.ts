import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PfcService } from '../../../@services/pfc.service';
import { DocumentData } from 'firebase/firestore';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [CommonModule, FormsModule, CardModule, ButtonModule],
  templateUrl: './display.component.html',
  styleUrl: './display.component.css',
})
export class DisplayComponent implements OnInit {
  workList!: (DocumentData | (DocumentData & { id: string; }))[]

  constructor(private readonly pfcService: PfcService) {}

  ngOnInit(): void {
    this.pfcService.getPfcs().subscribe(async data => {
      this.workList = [];
      for (const item of data) {
        this.workList.push(item)
      }
    });
  }

  viewPdf(base64Content: string) {
    const blob = this.base64ToBlob(base64Content, 'application/pdf');
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  }
  
  base64ToBlob(base64: string, contentType: string): Blob {
    const byteCharacters = atob(base64);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      byteArrays.push(new Uint8Array(byteNumbers));
    }
  
    return new Blob(byteArrays, { type: contentType });
  }
}
