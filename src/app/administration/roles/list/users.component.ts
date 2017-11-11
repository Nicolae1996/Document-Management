import { Component, OnInit } from '@angular/core';
import { TableConfig, ActionsButtons, Targets } from "../../../shared/templates/table/table.config";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html'
})
export class RolesListComponent implements OnInit {
 public options = new TableConfig({
        allowPagination: true,
        itemsperpage: 10,
        tableTitle: 'Roles Management',
        tableColumns: ["First Name", "Last Name"],
        tableKeys: [""],
        targets: new Targets({
            targetApi: '/api/'
        }),
        actions: new ActionsButtons({
            create: true,
            delete: true,
            edit: true
        })
    });
  constructor() { }

  ngOnInit() {
  }

}
