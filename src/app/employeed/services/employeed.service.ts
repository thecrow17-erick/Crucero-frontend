import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../shared/interface';
import { IGetAllEmployeed, IResponseCreateEmployeed } from '../interfaces';
import { LocalstorageService } from '../../shared/services';
import { ICreateEmployeed } from '../../landing/interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeedService {
  private url = environment.apiUrl;
  private httpClient = inject(HttpClient);
  private localStorage = inject(LocalstorageService);


  public getAllEmployeed(): Observable<IApiResponse<IGetAllEmployeed>> {
    const token = this.localStorage.getItem<string>("token");
    const headers = new HttpHeaders()
      .append("auth-token", token!);

    return this.httpClient.get<IApiResponse<IGetAllEmployeed>>(`${this.url}/empleado`,{
      headers
    });
  }


  public createEmployeed(body: ICreateEmployeed): Observable<IApiResponse<IResponseCreateEmployeed>> {
    return this.httpClient.post<IApiResponse<IResponseCreateEmployeed>>(`${this.url}/auth/sign-up`, body);
  }
}
