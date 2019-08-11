import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PaginatedResult } from '../_models/pagination';
import { Message } from '../_models/Message';
import { AuthService } from '../_services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class MessagesResolver implements Resolve<PaginatedResult<Message[]>> {
    pageNumber = 1;
    pageSize = 6;
    messageContainer = "Unread";

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private router: Router,
        private alertify: AlertifyService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<PaginatedResult<Message[]>> {
        return this.userService.getMessages(this.authService.decodedToken.nameid, 
            this.pageNumber, this.pageSize, this.messageContainer).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving messages');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}