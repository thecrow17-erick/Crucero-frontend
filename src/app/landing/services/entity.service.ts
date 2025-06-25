import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../shared/interface';
import { ICreateEntity, IGetDivisas, IResponseCreateEntity } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class EntityService {
  private url = environment.apiUrl;
  private httpClient = inject(HttpClient);



  public getDivisas():Observable<IApiResponse<IGetDivisas>>{
    return this.httpClient.get<IApiResponse<IGetDivisas>>(`${this.url}/divisa`);
  }

  public createEntity(body: ICreateEntity):Observable<IApiResponse<IResponseCreateEntity>> {
    return this.httpClient.post<IApiResponse<IResponseCreateEntity>>(`${this.url}/entidad-operadora`, body);
  }
}
