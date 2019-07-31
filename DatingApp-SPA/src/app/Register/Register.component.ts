import { OnInit, EventEmitter, Output, Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl } from '@angular/forms';

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
  registerForm: FormGroup;

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl()
    })
  }

  register(){
  //  this.authService.register(this.model).subscribe(() => {
  //    this.alertify.success("Registration successful");
  //  }, error => {
  //   this.alertify.error(error)
  //  })
  console.log(this.registerForm.value);
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

  togglePassword(){
    this.isPasswordVisible = !this.isPasswordVisible;
    this.inputType = this.isPasswordVisible == false ? this.inputType = "password" : this.inputType = "text";
  }
}
