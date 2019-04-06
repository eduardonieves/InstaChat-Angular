import { TestBed, inject } from '@angular/core/testing';

import { RemoteServerService } from './remote-server.service';

describe('RemoteServerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemoteServerService]
    });
  });

  it('should be created', inject([RemoteServerService], (service: RemoteServerService) => {
    expect(service).toBeTruthy();
  }));
});
