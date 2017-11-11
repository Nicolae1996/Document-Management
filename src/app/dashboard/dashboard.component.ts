import { Component } from '@angular/core';
import { Menu } from './../menu';
import { AuthenticationService } from "../services/authentication.service";

@Component({
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
    mode: boolean = false;
    modeString = null;

    constructor(private authenticationService: AuthenticationService) {
        this.authenticationService.ModeMenuGlobal.subscribe((data: any) => {
            this.modeString = data;
        });
        if (this.modeString === "horizontal") this.mode = true;
    }
    public onMenuModeChange(data: any): void {
        if (this.modeString === "horizontal") {
           this.modeString = "vertical";
            this.mode = false;
            this.authenticationService.ModeMenuGlobal.next('vertical');
        } else {
            this.modeString = "horizontal";
            this.mode = true;
            this.authenticationService.ModeMenuGlobal.next('horizontal');
        }
    }
}
