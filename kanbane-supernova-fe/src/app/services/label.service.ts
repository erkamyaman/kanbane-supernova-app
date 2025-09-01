import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LabelOption } from '../pages/labels/labels';

@Injectable({
  providedIn: 'root'
})
export class LabelService {
  constructor(private http: HttpClient) { }

  getLabels(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/labels`)
  }

  deleteLabel(id: string) {
    return this.http.delete<any>(`${environment.apiUrl}/labels/${id}`);
  }

  createLabel(label: Omit<LabelOption, 'id'>): Observable<LabelOption> {
    return this.http.post<LabelOption>(`${environment.apiUrl}/labels`, label);
  }

  updateLabel(id: string, label: Partial<LabelOption>): Observable<LabelOption> {
    return this.http.patch<LabelOption>(`${environment.apiUrl}/labels/${id}`, { data: label });
  }
}
