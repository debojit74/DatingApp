import { AlertComponent } from './alert/alert.component';
import { User } from './_models/user';
import { AuthService } from './_services/auth.service';
import {
  Component, OnInit, ViewChild, ViewContainerRef,
  ComponentFactoryResolver, ComponentFactory, ComponentRef, HostListener
} from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild("alertContainer", { read: ViewContainerRef, static: false }) container;
  componentRef: ComponentRef<any>;

  jwtHelper = new JwtHelperService();
  
  userActive: boolean = true;
  userActivity: any;

  constructor(private authService: AuthService, 
     private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));

    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
    if (user) {
      this.authService.currentUser = user;
      this.authService.changeMemberPhoto(user.photoUrl);
    }
    this.setTimeout();
  }

  createComponent(message: string) {
    this.container.clear();
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(AlertComponent);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.message = message;
    this.componentRef.instance.clickHandler.subscribe(() => {
      this.userActive = true;
      this.refreshUserState();
    })
  }

  setTimeout() {
    this.userActivity = setTimeout(() => {
      this.userActive = false;
      this.createComponent("Timed out!!!")
    }, 1800000);
  }

  @HostListener('window:mousedown')
  @HostListener('window:mousemove') refreshUserState() {
    if(this.userActive) {
      this.container.clear();
      this.userActive = true;
      clearTimeout(this.userActivity);
      this.setTimeout();
    }
  }
}
