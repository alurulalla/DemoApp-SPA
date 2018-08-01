import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/User';
import { Injectable } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { Observable, of } from 'rxjs';

@Injectable()
export class MemberListResolver implements Resolve<User[]> {
    pageSize = 5;
    pageNumber = 1;

    constructor(private userService: UserService, private router: Router,
        private alertify: AlertifyService) {}
    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userService.getUsers(this.pageNumber, this.pageSize)
        .pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/home']);
                return of(null);
            }));
    }
}
