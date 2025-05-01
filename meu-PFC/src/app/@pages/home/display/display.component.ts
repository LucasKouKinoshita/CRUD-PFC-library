import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../@services/auth.service';
import { PfcService } from '../../../@services/pfc.service';
import { DocumentData } from 'firebase/firestore';

@Component({
  selector: 'app-display',
  imports: [CommonModule, FormsModule],
  templateUrl: './display.component.html',
  styleUrl: './display.component.css'
})
export class DisplayComponent implements OnInit{

  workList!: (DocumentData | (DocumentData & { id: string; }))[]

  constructor(
    private readonly authService: AuthService,
    private readonly pfcService: PfcService
  ){}

  ngOnInit(): void {
    this.pfcService.getPfcs().subscribe(
      data => {
        this.workList = data;
      }
    ) 
  }
}
