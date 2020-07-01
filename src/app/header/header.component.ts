import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorajeService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';
import { User } from '../auth/user.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  collapsed = false;
  isAuthenticated = false;
  userSub: Subscription;

  constructor(private storeService: DataStorajeService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.userSubject.subscribe(user => {
      this.isAuthenticated = !! user;
    })
  }

  ngOnDestroy(): void {
    this.authService.userSubject.unsubscribe();
  }

  onSaveData(){
    this.storeService.storeData();
  }

  onFetchData(){
    this.storeService.fetchData().subscribe();
  }

  onLogout(){
    this.authService.logout();
  }
}
