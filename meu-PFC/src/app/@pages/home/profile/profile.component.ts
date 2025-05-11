import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of, switchMap } from 'rxjs';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../@services/auth.service';
import { UserInterface } from '../../../@interfaces/user.interface';
import { PfcService } from '../../../@services/pfc.service';
import { DocumentData } from 'firebase/firestore';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    DividerModule,
    ButtonModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: UserInterface | null = null;
  workList: (DocumentData & { id?: string })[] = [];
  allWorks: (DocumentData & { id?: string })[] = [];
  constructor(
    private authService: AuthService,
    private pfcService : PfcService
  ) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      if (user) {
        this.user = user
        console.log('User is logged in:', user);
      } else {
        this.user = null
      }
    });
    this.pfcService.getPfcs().subscribe(data => {
    this.allWorks = data;
    // Filtrar apenas os PFCs que têm o e-mail do usuário
    const userEmail = this.user?.email?.toLowerCase() ?? '';
    this.workList = this.allWorks.filter(work => {
    const workEmail = (work['email'] || '').toLowerCase();
    return workEmail === userEmail;
    });
});
  }
}
