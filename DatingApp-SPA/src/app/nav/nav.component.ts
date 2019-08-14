import { SubjectService } from './../_services/subject.service';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;
  @ViewChild('loginForm') loginForm : NgForm;

  constructor(public authService: AuthService,
    private subjectService: SubjectService,
    private alertify: AlertifyService,
    private router: Router) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => {
      this.photoUrl = photoUrl;
    });
  }

  login() {
    this.subjectService.loadingStatus(true);
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success("Logged in successfully");
      this.subjectService.loadingStatus(false);
    }, error => {
      this.subjectService.loadingStatus(false);
      this.alertify.error(error);
    }, () => {
      this.loginForm.reset();
      this.router.navigate(['/members']);
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.message("Logged out");
    this.router.navigate(['/home']);
  }
}
