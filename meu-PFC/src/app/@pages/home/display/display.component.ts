import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PfcService } from '../../../@services/pfc.service';
import { DocumentData } from 'firebase/firestore';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SearchStateService } from '../../../@services/search-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [CommonModule, FormsModule, CardModule, ButtonModule],
  templateUrl: './display.component.html',
  styleUrl: './display.component.css',
})
export class DisplayComponent implements OnInit {
  workList: (DocumentData & { id?: string })[] = [];
  allWorks: (DocumentData & { id?: string })[] = [];
  private searchSub!: Subscription;

  constructor(
    private readonly pfcService: PfcService,
    private readonly searchStateService: SearchStateService
  ) {}

  ngOnInit(): void {
    this.pfcService.getPfcs().subscribe(data => {
      this.allWorks = data;
      this.workList = [...this.allWorks];
    });

    this.searchSub = this.searchStateService.searchTerm$.subscribe(term => {
      if (!term || term.term === '') {
        this.workList = [...this.allWorks];
        return;
      }

      const filtered = this.allWorks.filter(work => {
        const value = (work[term.field] || '').toLowerCase();
        return value.includes(term.term);
      });

      this.workList = filtered;
    });
  }

  ngOnDestroy(): void {
    this.searchSub?.unsubscribe();
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
