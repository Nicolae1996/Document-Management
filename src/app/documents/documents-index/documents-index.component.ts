import { Component, OnInit } from '@angular/core';
import { NodeEvent } from "../../shared/file-tree/tree.events";
import { TreeModel, Ng2TreeSettings } from "../../shared/file-tree/tree.types";
import { AuthHttp } from "angular2-jwt";
import { Config } from "../../config";
import { Observable } from "rxjs/Rx";
import { TableConfig, Targets, ActionsButtons, NewButton, Model } from "../../shared/templates/table/table.config";
import { RequestOptions, URLSearchParams } from '@angular/http';
import { ActionsService } from "../../services/actions.service";
@Component({
  selector: 'app-documents-index',
  templateUrl: './documents-index.component.html'
})
export class DocumentsIndexComponent implements OnInit {
  public folderIdToDelete: any;
  public options = new TableConfig({
    tableTitle: 'Documents',
    tableColumns: ["Name", "Path"],
    tableKeys: ["Name", "Path"],
    targets: new Targets({
      targetApi: '/api/Documents',
      targetGetMethod: 'openfolder',
      parameters: [
        {
          name: 'folderId',
          value: ''
        }
      ]
    }),
    actions: new ActionsButtons({
      allowActionsColumn: false,
      newButtons: Array<NewButton>(
      )
    }),
    model: new Model({
      extractFrom: ["result", "Folders"]
    })
  });

  //declare tree model
  public dataTree: TreeModel;
  /**
   * Constructor
   * @param authhttp 
   * For authentificated requests
   */
  constructor(public authhttp: AuthHttp, public service: ActionsService) {
  }
  /**
   * On View initialization
   */
  ngOnInit(): void {
    this.authhttp.get(Config.data + "/api/Documents/openfolder").toPromise().then(
      (res: any) => {
        let data: any = res.json();
        if (data.is_success) {
          this.dataTree = {
            value: data.result.Folders[0].Name,
            id: data.result.Folders[0].Id,
            settings: {
              cssClasses: {
                expanded: 'fa fa-caret-down',
                collapsed: 'fa fa-caret-right',
                empty: 'fa fa-caret-right disabled',
                leaf: 'fa'
              },
              templates: {
                node: '<i class="fa fa-folder-o"></i>',
                leaf: '<i class="fa fa-file-o"></i>'
              }
            },
            loadChildren: (childs) => {
              this.loaderData(data.result.Folders[0].Id)
                .subscribe((res: any) => {
                  childs(res);
                });
            }
          };
        }
      },
      (error: any) => {

      });
  }
  /**
   * Load data from API
   * @param id 
   * Folder Id
   */
  public loaderData(id: any): Observable<any> {
    return this.authhttp.get(Config.data + "/api/Documents/openfolder?folderId=" + id)
      .map((data: any) => {
        return this.extractData(data);
      });
  }
  /**
   * Work with data
   * @param res 
   */
  private extractData(res: any) {
    let response: any = [];
    let data: any = res.json();
    if (data.is_success) {
      if (data.result.Folders.length > 0) {
        for (var elem in data.result.Folders) {
          let temp = data.result.Folders[elem].Id;
          response.push({
            value: data.result.Folders[elem].Name, id: data.result.Folders[elem].Id.toString(),
            loadChildren: (childs) => {
              this.loaderData(temp)
                .subscribe((res: any) => {
                  childs(res);
                });
            }
          });
        }
      }

      if (data.result.FileVersions.length > 0) {
        let files = data.result.FileVersions;
        for (var elem in files) {
          let extension = files[elem].FileExtension.toString().split('.')[1];
          response.push({
            settings: {
              leftMenu: true,
              templates: {
                leaf: `<span class="extension-icon extension-icon-${extension}"></span>`,
                leftMenu: '<i class="fa fa-navicon"></i>'
              }
            },
            value: `${files[elem].FileName}.${extension}`,
            id: files[elem].Id
          });
        }
      }
    }
    return response;
  }
  /**
   * On node remove event
   * @param e 
   */
  public onNodeRemoved(e: NodeEvent): void {

  }
  /**
   * On node move event
   * @param e 
   */
  public onNodeMoved(e: NodeEvent): void {
    console.log(e);
    let previous: any = e;
    let PathTo: string;
    let parentOfparent = e.node.parent.parent.node.id;

    this.authhttp.get(`${Config.data}/api/Documents/openfolder?folderId=${parentOfparent}`).subscribe(
      (res: any) => {
        let response = res.json();
        if (response.is_success) {
          for (var i in response.result.Folders) {
            if (response.result.Folders[i].Id === e.node.parent.node.id) {
              PathTo = response.result.Folders[i].Path;
            }
          }
          let params: URLSearchParams = new URLSearchParams();

          params.set('fileid', previous.node.node.id);
          params.set('target', PathTo);
          params.set('addedby', 'user');

          this.authhttp.post(`${Config.data}/api/Documents/MoveFile`, params).subscribe(
            (res: any) => {
              let response: any = res.json();
              if (response.is_success) {
                alert("File moved succesfuly");
              }
            },
            (error: any) => {

            }
          );
        }
      },
      (error: any) => {

      }
    );
    console.log(e);
  }
  /**
   * On node rename event
   * @param e 
   */
  public onNodeRenamed(e: NodeEvent): void {
    let model: any = e;
    alert(`${model.newValue}, id: ${e.node.node.id}`);
    let params: URLSearchParams = new URLSearchParams();

    let requestOptions = new RequestOptions();
    params.set('fileVersionId', e.node.node.id.toString());
    params.set('newName', model.newValue.toString());
    params.set('modifiedBy', 'test');
    alert(Config.data + "/api/Documents/rename");
    requestOptions.search = params;
    this.authhttp.post(Config.data + "/api/Documents/rename" +
      `?fileVersionId=${e.node.node.id.toString()}&&newName=${model.newValue.toString().split(".")[0]}&&modifiedBy=testUser`
      , "").toPromise().then(
      (res: any) => {
        let response = res.json();
        if (response.is_success) {
          alert("Renamed succesfyully");
        }
      },
      (error: any) => {
        console.log(error);
        location.reload();
      }
      );
  }
  /**
   * On node create event
   * @param e 
   */
  public onNodeCreated(e: NodeEvent): void {

  }
  /**
   * On node select event
   * @param e 
   */
  public onNodeSelected(e: NodeEvent): void {
    this.authhttp.get(Config.data + "/api/Documents/openfolder?folderid=" + e.node.node.id).subscribe(
      (res: any) => {
        let response = res.json();
        if (response.is_success) {

          let value: number;
          this.service.ischangeListModel.subscribe((val) => {
            value = val;
          });
          if (response.result.FileVersions.length > 0) {
            //list of files
            this.options.model.extractFrom = ["result", "FileVersions"];
            this.options.tableColumns = ["FileName"];
            this.options.tableKeys = ["FileName"];
            this.options.actions.allowActionsColumn = true;
            this.options.actions.newButtons = [new NewButton({
              name: 'Download',
              icon: 'fa fa-plus',
              className: 'info'
            })];
          }
          else {
            //list of folders
            this.folderIdToDelete = e.node.node.id;
            this.options.actions.allowActionsColumn = false;
            this.options.tableColumns = ["Name", "Path"];
            this.options.tableKeys = ["Name", "Path"];
            this.options.model.extractFrom = ["result", "Folders"];
          }
          this.options.targets.parameters = [
            {
              name: 'folderId',
              value: e.node.node.id
            }
          ];
          this.service.ischangeListModel.next(++value);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  /**
   * On node expanded event
   * @param e 
   */
  public onNodeExpanded(e: NodeEvent): void {

  }
  /**
   * On node collapse event
   * @param e
   */
  public onNodeCollapsed(e: NodeEvent): void {

  }
  public deleteFolder(): void {
    if (this.folderIdToDelete == null) {
      alert("Select a folder to delete");
    }
    else
      this.authhttp.post(`${Config.data}/api/Documents/deletefolder?folderId=${this.folderIdToDelete}`, "")
        .toPromise()
        .then((res: any) => {
          let response = res.json();
          if (response.is_success) {
            alert("Folder was succesfully deleted!");
          }
        })
        .catch((error) => {
          console.log(error);
        });
  }
}

