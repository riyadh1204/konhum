import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class SendDataService {
  private data: any;
  constructor(private http: Http) { }
  searchData(title: string): Observable<any> {
    return this.http.get(`http://konsultasihukum.101creative.id/api/search/advokat?keyword=${encodeURI(title)}`).pipe(
      map(results => results['Search'])
    );
  }

  public setData(data) {
    this.data = data;
  }

  getData(){
    return this.data;
  }

 
}
