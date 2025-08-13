import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanTop } from './kanban-top';

describe('KanbanTop', () => {
  let component: KanbanTop;
  let fixture: ComponentFixture<KanbanTop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanbanTop],
    }).compileComponents();

    fixture = TestBed.createComponent(KanbanTop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
