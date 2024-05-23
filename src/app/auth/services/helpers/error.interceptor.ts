import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "../auth.service";
// import { BlockUI, NgBlockUI } from "ng-block-ui";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    // @BlockUI() blockUI: NgBlockUI;
    /**
     * @param {Router} _router
     * @param {AuthService} _authenticationService
     */
    constructor(
        private _router: Router,
        private _authenticationService: AuthService,
        // private readonly logger: LoggerService
    ) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((err) => {
                if ([401, 403].indexOf(err.status) !== -1) {
                    // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                    this._authenticationService.logout();
                    // this._router.navigate(['/auth/login']);

                    // ? Can also logout and reload if needed
                    // this._authenticationService.logout();
                    // location.reload(true);
                }
                // throwError
                // this.blockUI.stop();
                const error = err.error.message || err.error.error || err.statusText;
                return throwError(error);
            })
        );
    }
}
