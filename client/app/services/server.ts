import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

import { ServerStatus } from '../model/serverStatus';
import { APP_CONFIG } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServerCall {
  constructor(private http: HttpClient) {}

  getServerStatus() {
    return this.http.get<ServerStatus>(APP_CONFIG.serverURI).pipe(
      shareReplay(),
      catchError((error: any) => {
        console.error(error);
        return of({ active: false } as ServerStatus);
      }),
    );
  }
}
