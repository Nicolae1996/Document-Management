import { Component, OnInit } from '@angular/core';
import { TableConfig, Filters, Targets, ActionsButtons, Model } from "../../shared/templates/table/table.config";

@Component({
  selector: 'app-localization-list',
  templateUrl: './localization-list.component.html',
  styleUrls: ['./localization-list.component.scss']
})
export class LocalizationListComponent implements OnInit {
  public options = new TableConfig({
    identifier: 'Name',
    allowPagination: true,
    itemsperpage: 10,
    tableTitle: 'Localization key',
    tableColumns: ["Key", "Value"],
    tableKeys: ["Name", "Value"],
    filters: new Filters({
     allowSearchGlobal: true
    }),
    targets: new Targets({
      targetApi: '/api/Localization',
      targetGetMethod: 'SearchKey',
      targetEdit: 'EditKey',
      parameters: [
        {
          name: "key",
          value: ''
        }
      ]
    }),
    actions: new ActionsButtons({
      allowActionsColumn: true,
      create: true,
      edit: true,
      delete: true
    }),
    model: new Model({
      extractFrom: ["result","result"]
    })
  });
  constructor() { }

  ngOnInit() {
  }

}
