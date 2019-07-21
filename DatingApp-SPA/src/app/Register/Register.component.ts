import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  register(){
   this.authService.register(this.model).subscribe(() => {
     console.log("Registration successful");
   }, error => {
     console.log("Error occured")
   })
  }

  cancel(){
    this.cancelRegister.emit(false);
    console.log("Cancelled");
  }
}
