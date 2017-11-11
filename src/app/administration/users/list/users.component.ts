import { Component, OnInit } from '@angular/core';
import { TableConfig, ActionsButtons, Targets, Model } from "../../../shared/templates/table/table.config";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersListComponent implements OnInit {
 public options = new TableConfig({
        allowPagination: true,
        itemsperpage: 10,
        tableTitle: 'Users Management',
        tableColumns: ["Username", "FirstName"],
        tableKeys: ["Username","FirstName"],
        targets: new Targets({
            targetApi: '/api/Users',
            targetEdit: 'edit'
        }),
        actions: new ActionsButtons({
            allowActionsColumn: true,
            create: true,
            delete: true,
            edit: true
        }),
        model: new Model({
            extractFrom: ["result"]
        })
    });
  constructor() { }

  ngOnInit() {
  }

}
