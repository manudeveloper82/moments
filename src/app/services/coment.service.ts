import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Coment} from '../Coments'
import {Response} from '../Response'

@Injectable({
  providedIn: 'root'
})
export class ComentService {
  private baseApiUrl = environment.baseApiUrl
  private apiUrl = `${this.baseApiUrl}api/moments/coments`

  constructor(private http: HttpClient) {}

  createComent(data: Coment): Observable<Response<Coment>>{
    const url = `${this.apiUrl}/${data.momentId}/coments`
    return this.http.post<Response<Coment>>(this.apiUrl,data)
  }
}
