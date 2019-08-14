import { AuthService } from './../_services/auth.service';
import { SubjectService } from './../_services/subject.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  values: any;
  loader: boolean;
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient, 
      private subjectService: SubjectService,
      private authService: AuthService,
      private router: Router) { }

  ngOnInit() {
    this.subjectService.isLoading.subscribe((data: boolean) => {
      this.loader = data;
    });

    this.isLoggedIn = this.authService.loggedIn();
    if(this.isLoggedIn){
      this.router.navigate(['members']);
    }
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }
}
