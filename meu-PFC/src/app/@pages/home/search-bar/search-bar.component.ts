import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { Firestore, collection, collectionData, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    FloatLabel,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
  ],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  inputValue: string = '';
  tagOptions: string[] = ['Orientator', 'Author', 'Title'];
  selectedTag: string = 'Title'; // Pode ser alterado dinamicamente no futuro
  tccs$: Observable<any[]> | undefined;

  constructor(private firestore: Firestore) {}

  onSearch() {
    const searchField = this.selectedTag.toLowerCase();
    const tccCollection = collection(this.firestore, 'tccs');

    const q = query(
      tccCollection,
      where(searchField, '>=', this.inputValue),
      where(searchField, '<=', this.inputValue + '\uf8ff')
    );

    this.tccs$ = collectionData(q, { idField: 'id' });
  }
}
