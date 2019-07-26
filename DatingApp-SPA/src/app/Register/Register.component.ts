import { OnInit, EventEmitter, Output, Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  isPasswordVisible: boolean = false;
  inputType = "password";

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  register(){
   this.authService.register(this.model).subscribe(() => {
     this.alertify.success("Registration successful");
   }, error => {
    this.alertify.error(error)
   })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

  togglePassword(){
    this.isPasswordVisible = !this.isPasswordVisible;
    this.inputType = this.isPasswordVisible == false ? this.inputType = "password" : this.inputType = "text";
  }
}
