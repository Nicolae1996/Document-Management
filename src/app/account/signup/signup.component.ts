import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Signin } from '../signin';

@Component({
    templateUrl: './signup.component.html'
})
export class SignupComponent extends Signin {

    constructor(
        protected router: Router,
        protected authenticationService: AuthenticationService) {
        super(router, authenticationService);
    }

    signup(): void {

    }

}
