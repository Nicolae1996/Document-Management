import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from './../shared.module';

@Component({
    selector: 'app-title',
    templateUrl: './titlePage.html'
})
export class DynamicTitleComponent implements OnInit {
    @Input() public title = "Default"; // title of page
    @Input() public type = "list"; //type of class for style

    public style: string = "";

    constructor() { }
    /**
     * onInit verify how class put for container
     */
    ngOnInit() {
        switch (this.type) {
            case 'list': {
                this.style = "fa fa-list-ul";
            } break;
            case 'edit': {
                this.style = "glyphicon glyphicon-pencil";
            } break;
            case 'create': {
                this.style = "fa fa-plus-square";
            } break;
        }
    }
}