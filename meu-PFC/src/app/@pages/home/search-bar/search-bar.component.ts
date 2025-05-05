import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { SearchStateService } from '../../../@services/search-state.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    FloatLabel,
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    SelectModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  inputValue: string = '';
  selectedField: string = 'title'; // valor padrão

  tagOptions = [
    { label: 'Title', value: 'title' },
    { label: 'Author', value: 'author' },
    { label: 'Orientator', value: 'orientator' },
  ];

  constructor(private searchStateService: SearchStateService) {}

  onSearch() {
    if (this.inputValue.trim()) {
      this.searchStateService.setSearchTerm(this.inputValue, this.selectedField);
    }
  }

  clearSearch() {
    this.inputValue = '';
    this.searchStateService.clearSearch();
  }
}
