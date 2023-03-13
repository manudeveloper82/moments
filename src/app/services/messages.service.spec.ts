import { TestBed } from '@angular/core/testing';

import { MomentMessagesService } from './messages.service';

describe('MomentessagesService', () => {
  let service: MomentMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MomentMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
