import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { SearchBarService } from '../../../@services/search-bar.service';
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
    DropdownModule,
  ],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  inputValue: string = '';
  selectedTag: string = 'title';
  tccs$: Observable<any[]> | undefined;

  tagOptions = [
    { label: 'Title', value: 'title' },
    { label: 'Author', value: 'author' },
    { label: 'Orientator', value: 'orientator' },
  ];

  constructor(private searchBarService: SearchBarService) {}

  onSearch(): void {
    this.tccs$ = this.searchBarService.searchTccs(this.selectedTag, this.inputValue);
  }
}
