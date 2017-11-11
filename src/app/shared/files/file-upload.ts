import { Component } from '@angular/core';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';

// const URL = '/api/';
//const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';
const URL = 'http://localhost:52126/api/values/uploadfile';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.html'
})
export class FileUploadComponent {
  public uploader:FileUploader = new FileUploader({
    url: URL
  });
constructor()
{
  this.uploader.onBeforeUploadItem = (item: FileItem) => {
  item.withCredentials = false;
  this.uploader.authToken = 'Bearer ' + localStorage.getItem("id_token");
  this.uploader.options.additionalParameter = {
    name: item.file.name,
    test_variabile: 'nicolae',
    test_array: ["var1", "var2", "var3"]
  };
};




   this.uploader.onSuccessItem = (item:FileItem, response:string, status:number, headers:ParsedResponseHeaders) => {
    console.log("onSuccessItem " + status, item);
  }



  this.uploader.onCompleteAll = () => {
      
  //console.log(this.uploader);
    };



this.uploader.onCompleteItem = () => {
  console.log(this.uploader);
}
this.uploader.onAfterAddingAll = () =>
{
  console.log(this.uploader);
}

}
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
}
