import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../shared/interface';
import { IGetAllBuses } from '../interface';
import { LocalstorageService } from '../../shared/services';

@Injectable({
  providedIn: 'root'
})
export class BusesService {
  private url = environment.apiUrl;
  private httpClient = inject(HttpClient);
  private localStorage = inject(LocalstorageService);

  public getBuses(): Observable<IApiResponse<IGetAllBuses>> {
    const entidadId = this.localStorage.getItem<string>('idEntidad');
    return this.httpClient.get<IApiResponse<IGetAllBuses>>(`${this.url}/micro/${entidadId}`);
  }
}
