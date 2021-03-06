﻿import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthenticationService } from './authentication.service';

/**
 * Decides if a route can be activated.
 */
@Injectable() export class AuthGuard implements CanActivate {

    constructor(private authenticationService: AuthenticationService, private router: Router) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.authenticationService.isSignedIn().map((signedIn: boolean) => {
            const url: string = state.url;

            if (signedIn) {
                 // if (url == "/account" || url == "/account/signin" || url == "/account/signup") {
                   //   this.router.navigate(['/dashboard']);
                 // }
                return true;
            }
            // Stores the attempted URL for redirecting.
            this.authenticationService.redirectUrl = url;

            // Not signed in so redirects to signin page.
            this.router.navigate(['/account/signin']);
            return false;
        });
    }

}
