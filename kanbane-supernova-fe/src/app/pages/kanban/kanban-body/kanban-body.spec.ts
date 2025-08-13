import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanBody } from './kanban-body';

describe('KanbanBody', () => {
  let component: KanbanBody;
  let fixture: ComponentFixture<KanbanBody>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanbanBody],
    }).compileComponents();

    fixture = TestBed.createComponent(KanbanBody);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
