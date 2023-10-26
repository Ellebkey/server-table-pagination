import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerTablePaginationComponent } from './server-table-pagination.component';

describe('ServerTablePaginationComponent', () => {
  let component: ServerTablePaginationComponent;
  let fixture: ComponentFixture<ServerTablePaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServerTablePaginationComponent]
    });
    fixture = TestBed.createComponent(ServerTablePaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
