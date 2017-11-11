import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { SharedModule } from './../../shared.module';
import { Permissions } from "./../../../models/permissions/permissions";
import { Router } from "@angular/router";
//service
import { ActionsService } from '../../../services/actions.service';
import { ModalsService } from "../../../services/modals.service";
import { TableConfig } from './table.config';

//for utilize jquery
declare var $: any;

@Component({
    selector: 'table-dinamic',
    templateUrl: './table-dinamic-component.html'
})
export class DynamicTableComponent implements OnInit, AfterViewInit {
    @Input() public options: TableConfig;
    public currentPage: number = 1;
    public enumerate: number;
    public toDelete: string = null;
    public model: any;
    public tableRows: Array<any> = [];
    public totalItems: number = 0;
    public totalpages: number = 1;
    public pagesize: any;
    public itemsperpage: number;
    public noitems = false;
    public tableLoaded = true;


    /**
     * constructor
     */
    constructor(private router: Router, private service: ActionsService, public modalService: ModalsService) {

    }
    /**
     * On constructor init data
     */
    public ngOnInit() {
        this.pagesize = this.options.itemsperpage;
        this.enumerate = this.currentPage * this.pagesize;
        this.itemsperpage = this.options.itemsperpage;
        this.options.targets.parameters.push(
            {
                name: 'page',
                value: this.currentPage
            });
        this.options.targets.parameters.push(

            {
                name: 'page_size',
                value: this.pagesize
            }
        );
        this.service.ischangeListModel.subscribe((value) => {
            this.setPage(1);
        });
    }
    /**
     * Set page for table
     * @param pageNo 
     * number for sett page
     */
    public setPage(pageNo: number): void {
        this.tableLoaded = true;
        if (pageNo != null) this.currentPage = pageNo;

        let url = `${this.options.targets.targetApi}/${this.options.targets.targetGetMethod}`;
        //old
        /*
        this.options.targets.targetApi + "/" + this.options.targets.targetGetMethod + "?page="
            + this.currentPage + "&&pageSize=" + this.pagesize + this.searchGlobalUrl[0] + this.searchGlobalUrl[1]
        */
        this.options.targets.parameters.push({
            name: 'page',
            value: this.currentPage
        });
        this.options.targets.parameters.push({
            name: 'page_size',
            value: this.pagesize
        });
        let parameters = this.options.targets.parameters;


        this.service.List(url, parameters).subscribe(
            (res: any) => {

                this.model = res[0].json();

                this.tableRows = this.model.result.result;

                let per = this.options.model.extractFrom;
                let perlength = per.length;
                let index = 0;
                let finalData = this.model;
                while (index < perlength) {
                    for (var key in finalData) {
                        if (key.toString() === per[index]) {
                            finalData = finalData[key];
                            continue;
                        }
                    }
                    index++;
                }
                this.tableRows = finalData;
                this.totalItems = this.model.result.total_count;
                this.itemsperpage = this.model.result.page_size;
                if (this.model.result.total_pages == null)
                    this.totalpages = Math.floor(this.model.result.total_count / this.itemsperpage) + 1;
                else this.totalpages = this.model.result.total_pages;
                this.tableLoaded = false;
            },
            (error: any) => {
                this.tableLoaded = false;
                console.log(error);
                this.modalService.modalInfo("error", error.toString());
            });
    };
    /**
     * event on page change for extern utilization
     * @param event 
     * data for extern utilization
     */
    public pageChanged(event: any): void {
        this.enumerate = this.currentPage * this.itemsperpage;
        console.log(event);
        this.setPage(event.pageNo);
    };
    /**
     * redirect for any modules to create
     */
    public redirect(): void {
        this.router.navigate([this.router.url + '/create']);
    }
    /**
     * 
     * @param id 
     */
    public edit(id: string) {
        this.service.EditGet(id, this.options.targets.targetApi, this.options.targets.targetEdit).subscribe(
            (res: any) => {
                this.model = res.json();
                let toEdit = this.model.result.result[0];
                this.router.navigate([this.router.url + '/edit', JSON.stringify(toEdit)]);
            },
            (error: any) => {
                this.modalService.modalInfo("error", "Unable to get edit page for this");
            }
        );
    }
    /**
     * 
     * @param id 
     */
    public fordelete(id: string): void {
        this.toDelete = id;
        document.getElementById("message-box-danger").className += " open";
    }
    /**
     * Delete from database with service
     */
    public deleteItem() {
        this.service.Delete(this.toDelete, this.options.targets.targetApi).subscribe(
            (res: any) => {
                console.log("Deleted: " + this.toDelete);
                this.modalService.modalInfo("success", "The item as deleted!");
                this.setPage(this.currentPage);
            },
            (error: any) => {
                this.modalService.modalInfo("error", "Unable to delete item");
            });
    }
    /**
     * Sort rows of table
     * @param mode 
     * if true sort asc else sort desc
     * @param target 
     * Specify the column
     */
    public sort(mode: boolean, target: string) {
        $("#init" + target.toString()).css("display", "none");
        alert("mode: " + mode + "\n target: " + target);
        if (mode) {
            $("#asc" + target.toString()).css("display", "none");
            $("#desc" + target.toString()).css("display", "block");
        }
        else {
            $("#desc" + target.toString()).css("display", "none");
            $("#asc" + target.toString()).css("display", "block");
        }

    }
    /**
     * Print content of table
     */
    print(): void {
        let printContents, popupWin, printColumns;
        printContents = document.getElementById('print-section').innerHTML;
        printColumns = document.getElementById('sort-table').innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>       
            <link rel="stylesheet" type="text/css" href="/css/print.template.css"/>
        </head>
        <body onload="window.print();window.close()"><table border="1"><tr>` + printColumns + `</tr>`
            + printContents + `</table></body>
      </html>`);
        popupWin.document.close();
    }
    /**
     * for do actions after html template are initialized
     * Include actions for html template with jquery
     */
    async ngAfterViewInit() {

        //for modals
        $(".mb-control-close").on("click", function () {
            $(this).parents(".message-box").removeClass("open");
            return false;
        });
        await this.loadScript("assets/js/customElements/bootstrap-select.js");
        await this.loadScript("assets/js/theme/plugins.js");
        $("#itemspage")
            .change(function () {
                var option = $("#itemspage option:selected").text();

            })
            .change();
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
    /**
     * Global search for all columns
     * @param event 
     */
    public SearchGlobal(event: any): void {
        let search = $("#globalsearch").val();
        try {
            let par = this.options.targets.parameters;
            for (var i in par) {
                if (par[i].name === this.options.identifier.toString()) {
                    par[i].value = search;
                }
            }
        }
        catch (e) {

        }
        this.options.targets.parameters;
        this.setPage(1);
    }
    /**
     * Event for change page items on number per page change
     * @param value 
     */
    onPerPageChange(event: any): void {
        this.pagesize = event.target.value;
        this.itemsperpage = this.pagesize;
        this.enumerate = this.currentPage * this.pagesize;
        this.setPage(this.currentPage);
    }
}