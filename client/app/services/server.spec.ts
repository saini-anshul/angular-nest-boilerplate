import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { APP_CONFIG } from '../../environments/environment';

import { ServerCall } from './server';
import { ServerStatus } from '../model/serverStatus';

describe('ServerCall', () => {
  let injector;
  let service: ServerCall;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServerCall],
    });

    injector = getTestBed();
    service = injector.get(ServerCall);
    httpMock = injector.get(HttpTestingController);
  });

  describe('#getServerStatus', () => {
    it('should return an Observable<ServerStatus>', () => {
      const dummyStatus: ServerStatus = {
        active: true,
      };

      service.getServerStatus().subscribe((serverStatus) => {
        expect(serverStatus).toEqual({ active: true });
      });

      const req = httpMock.expectOne(APP_CONFIG.serverURI);
      expect(req.request.method).toBe('GET');
      req.flush(dummyStatus);
    });
  });
});
