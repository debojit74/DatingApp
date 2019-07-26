import { SubjectService } from './../_services/subject.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  values: any;
  loader: boolean;

  constructor(private http: HttpClient, private subjectService: SubjectService) { }

  ngOnInit() {
    this.subjectService.isLoading.subscribe((data: boolean) => {
      this.loader = data;
    });
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }
}
