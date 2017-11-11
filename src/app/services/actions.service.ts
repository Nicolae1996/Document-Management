import { Injectable, Optional } from '@angular/core';
import { Http, Response } from '@angular/http';

import { AuthHttp } from 'angular2-jwt';

import { Config } from '../config';
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";
import { RequestOptions, URLSearchParams } from '@angular/http';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
/**
 * Service for Actions Create , update, delete
 */
@Injectable() export class ActionsService {
    public targetApi = Config.data;
    public ischangeListModel = new BehaviorSubject<number>(1);
    /**
     * constructor
     * @param authHttp 
     * request with securization
     */
    constructor(private authHttp: AuthHttp) { }
    /**
     * Create method for forms
     * @param model 
     * model from form to save in database
     * @param target 
     * For identifyng url of api
     */
    public List(target: string, parameters: any): Observable<any> {
        let params: URLSearchParams = new URLSearchParams();
        try {
            if (parameters.length > 0) {
                for (let par in parameters) {
                    let name = parameters[par].name;
                    let value = parameters[par].value;
                    params.set(name, value);
                }
            }
        }
        catch(e)
        {
            console.log("Can't get Data");
        }

        let requestOptions = new RequestOptions();
        requestOptions.search = params;

        return this.authHttp.get(this.targetApi + target, requestOptions)
            .map((res: Response) => {
                let Permissions: any;
                this.authHttp.get(this.targetApi + "/api/Permissions/GetByCategory" + {
                    category: "",
                    prefix: ""
                }).map((permissions: any) => {
                    Permissions = permissions;
                });
                return [
                    res, Permissions
                ];

            }).catch((error: any) => {
                return Observable.throw(error);
            });
    }
    public Create(model: any, target: string): Observable<any> {
        let body = JSON.stringify(model);

        return this.authHttp.post(this.targetApi + "/" + target, model)
            .map((res: Response) => {
                return res;
            }).catch((error: any) => {
                return Observable.throw(error);
            });
    }
    /**
* Edit method for forms
* @param model 
* model from form to update in database
* @param target 
* For identifyng url of api
*/
    public EditGet(id: string, target: string, targetedit: string): Observable<any> {
        return this.authHttp.get(this.targetApi + target + "/" + targetedit + "/" + id)
            .map((res: Response) => {
                return res;
            }).catch((error: any) => {
                return Observable.throw(error);
            });
    }
    /**
 * Edit method for forms
 * @param model 
 * model from form to update in database
 * @param target 
 * For identifyng url of api
 */
    public EditPost(model: any, target: string): Observable<any> {
        return this.authHttp.post(this.targetApi + target, model)
            .map((res: Response) => {
                return res.json();
                //some actions
            }).catch((error: any) => {
                return Observable.throw(error);
            });
    }

    /**
     * Delete method for forms
     * @param id 
     * Guid parameter for identifyng data.
     * @param target 
     * For identifyng url of api
     */
    public Delete(id: string, target: string): Observable<any> {
        return this.authHttp.delete(this.targetApi + target + "/delete/" + id)
            .map((res: Response) => {
                const body: any = res.json();
                //some actions
            }).catch((error: any) => {
                return Observable.throw(error);
            });
    }
}