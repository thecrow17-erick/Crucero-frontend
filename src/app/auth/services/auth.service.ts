import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments';
import { HttpClient } from '@angular/common/http';
import { IAuthBody, IResponseAuthLogin } from '../interfaces/auth.interface';
import { Observable, ObservableLike } from 'rxjs';
import { IApiResponse } from '../../shared/interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.apiUrl;
  private httpClient = inject(HttpClient);


  public login(body: IAuthBody): Observable<IApiResponse<IResponseAuthLogin>>{
    return this.httpClient.post<IApiResponse<IResponseAuthLogin>>(`${this.url}/auth/sign-in`, body);
  }

}
