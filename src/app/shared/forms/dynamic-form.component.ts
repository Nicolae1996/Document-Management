import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ControlBase } from './control-base';
import { FormControlService } from './form-control.service';

@Component({
    selector: 'appc-dynamic-form',
    templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnInit , AfterViewInit{

    @Input() public controls: Array<ControlBase<any>> = [];
    @Input() public btnText = 'Submit'; // Default value at least
    @Input() public formClass = 'form-horizontal';
    @Input() public name = "Data";
    @Input() public allowFiles: boolean = false;
    // Note: don't keep name of output events as same as native events such as submit etc.
    @Output() public formsubmit: EventEmitter<any> = new EventEmitter<any>();
    public form: FormGroup;

    constructor(public _controlService: FormControlService) {

    }

    public ngOnInit() {
        const sortedControls = this.controls.sort((a, b) => a.order - b.order);
        this.form = this._controlService.toControlGroup(sortedControls);
    }

    public onSubmit() {
        this.formsubmit.emit(this.form.value);
    }
    public back() {
        history.back();
    }
    /**
   * for do actions after html template are initialized
   * Include actions for html template with jquery
   */
    async ngAfterViewInit() {
        await this.loadScript("assets/js/customElements/bootstrap-select.js");
        await this.loadScript("assets/js/customElements/bootstrap-datepicker.js");
        await this.loadScript("assets/js/customElements/jquery.tagsinput.min.js");
        await this.loadScript("assets/js/customElements/icheck.min.js");
        await this.loadScript("assets/js/theme/plugins.js");

    }
    /**
     * Load async scripts
     * @param scriptUrl 
     * url of script
     */
    private loadScript(scriptUrl: string) {
        return new Promise((resolve, reject) => {
            const scriptElement = document.createElement('script')
            scriptElement.src = scriptUrl
            scriptElement.onload = resolve
            document.body.appendChild(scriptElement)
        })
    }
}
