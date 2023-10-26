import { TestBed } from '@angular/core/testing';

import { ServerTablePaginationService } from './server-table-pagination.service';

describe('ServerTablePaginationService', () => {
  let service: ServerTablePaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerTablePaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
