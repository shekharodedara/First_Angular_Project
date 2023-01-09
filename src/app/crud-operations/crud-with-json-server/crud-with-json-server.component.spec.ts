import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudWithJsonServerComponent } from './crud-with-json-server.component';

describe('CrudWithJsonServerComponent', () => {
  let component: CrudWithJsonServerComponent;
  let fixture: ComponentFixture<CrudWithJsonServerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudWithJsonServerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudWithJsonServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
