import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/User';
import { Injectable } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
// import { Observable } from 'rxjs/internal/Observable';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/of';

@Injectable()
export class ListsResolver implements Resolve<User[]> {
    pageSize = 5;
    pageNumber = 1;
    likeParam = 'Likers';

    constructor(private userService: UserService, private router: Router,
        private alertify: AlertifyService) {}
    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userService.getUsers(this.pageNumber, this.pageSize, null, this.likeParam)
        .pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
