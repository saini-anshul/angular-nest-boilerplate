import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerCall } from './services/server';
import { ServerStatus } from './model/serverStatus';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'client-app';
  serverStatus$: Observable<ServerStatus>;

  constructor(private serverCall: ServerCall) {
    this.serverStatus$ = serverCall.getServerStatus();
  }
}
