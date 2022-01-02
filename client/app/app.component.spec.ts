import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

import { ServerCall } from './services/server';
import { of } from 'rxjs';
import { ServerStatus } from './model/serverStatus';

let serverCall: ServerCall;
let serverCallSpy: jasmine.SpyObj<ServerCall>;

describe('AppComponent', () => {
  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ServerCall', ['getServerStatus']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [AppComponent],
      providers: [ServerCall, { provide: ServerCall, useValue: spy }],
    }).compileComponents();

    serverCall = TestBed.inject(ServerCall);
    serverCallSpy = TestBed.inject(ServerCall) as jasmine.SpyObj<ServerCall>;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'client-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('client-app');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.client-app span')?.textContent).toContain(
      'client-app app is running!',
    );
  });

  it('should render server status as reachable', () => {
    const serverStatus: ServerStatus = { active: true };
    serverCallSpy.getServerStatus.and.returnValue(of(serverStatus));

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.server span')?.textContent).toContain(
      'Nest server is reachable!',
    );
  });

  it('should render server status as not reachable', () => {
    const serverStatus: ServerStatus = { active: false };
    serverCallSpy.getServerStatus.and.returnValue(of(serverStatus));

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.server span')?.textContent).toContain(
      'Server is not reachable!',
    );
  });
});
