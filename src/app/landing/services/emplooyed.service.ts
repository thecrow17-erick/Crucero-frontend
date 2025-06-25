import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments";
import { HttpClient } from "@angular/common/http";
import { ICreateEmployeed, IResponseAdminCreate } from "../interface";
import { Observable } from "rxjs";
import { IApiResponse } from "../../shared/interface";



@Injectable({
  providedIn: 'root'
})
export class EmployeedService {
  private url = environment.apiUrl;

  private httpClient = inject(HttpClient);

  public createAdminEmployeed(body: ICreateEmployeed):Observable<IApiResponse<IResponseAdminCreate>> {
    return this.httpClient.post<IApiResponse<IResponseAdminCreate>>(`${this.url}/auth/sign-up`, body);
  }


}
