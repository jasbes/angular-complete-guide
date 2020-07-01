import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  isLogin = true;
  isLoading = false;
  error: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    let authObs: Observable<AuthResponseData>;
    this.isLoading = true;
    if (this.isLogin) {
      authObs = this.authService.login(form.value.email, form.value.password);
    } else {
      authObs = this.authService.signup(form.value.email, form.value.password);
    }

    authObs.subscribe(resp => {
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, errorMessage => {
      this.error = errorMessage;
      this.isLoading = false;
    });

    form.reset();
  }

}
