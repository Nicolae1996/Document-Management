import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import { Signin } from '../signin';
//for utilize jquery
declare var $: any;

@Component({
    templateUrl: './signin.component.html'
})
export class SigninComponent extends Signin implements OnInit {

    constructor(
        protected router: Router,
        protected authenticationService: AuthenticationService) {
        super(router, authenticationService);
        // Preloads data for live example.
        this.model.username = "nicolae.lupei@2017.com";
        this.model.password = "1";
    }
    ngOnInit(): void {
        $("#loader").css("display", "none");
        $(".theme-settings").css("display","none");
    }
}