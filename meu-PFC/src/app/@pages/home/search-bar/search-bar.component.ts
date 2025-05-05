import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { SearchStateService } from '../../../@services/search-state.service';
import { CommonModule } from '@angular/common';

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
    DropdownModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  inputValue: string = '';
  selectedTag: string = 'Title';
  tagOptions: string[] = ['Orientator', 'Author', 'Title'];

  constructor(private searchState: SearchStateService) {}

  onSearchClick() {
    this.searchState.setSearchTerm(this.inputValue.trim(), this.selectedTag.toLowerCase());
  }
}
