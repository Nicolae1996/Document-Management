import { Injectable } from '@angular/core';
//for utilize jquery
declare var $: any;
/**
 * Service for 
 */
@Injectable() export class ModalsService {
    constructor() {
    }
    /**
    * Show status in UI of your action
    * @param level 
    * @param message 
    */
    public modalInfo(level: string, message: string): void {
        //for modals
        $(".mb-control-close").on("click", function () {
            $(this).parents(".message-box").removeClass("open");
            return false;
        });
        try {
            $("#message-box-" + level).addClass("open");
            $("#mb-content-" + level).html(message);
        }
        catch (e) {
            console.log(e);
        }
    }
}