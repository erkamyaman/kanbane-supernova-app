import { Component } from '@angular/core';
import { DragDropModule } from 'primeng/dragdrop';

type Task = { id: string; name: string; columnId?: string, details?: any[] };
type Column = { id: string; title: string; items: Task[] };

@Component({
  selector: 'app-kanban-body',
  imports: [DragDropModule],
  templateUrl: './kanban-body.html',
  styleUrl: './kanban-body.scss',
})
export class KanbanBody {
  fromColId: string = ''
  draggedProduct: any | undefined | null;

  columns: Column[] = [
    {
      id: '1',
      title: 'First',
      items: [
        { id: 'p-001', name: 'Black Watch', columnId: '1' },
        { id: 'p-002', name: 'Bamboo Watch', columnId: '1' },
        { id: 'p-003', name: 'Blue T-Shirt', columnId: '1' },
      ],
    },
    {
      id: '2',
      title: 'Second',
      items: [
        { id: 'p-101', name: 'Gaming Headset', columnId: '2' },
        { id: 'p-102', name: 'Office Chair', columnId: '2' },
        { id: 'p-103', name: 'USB-C Hub', columnId: '2' },
      ],
    },
    {
      id: '3',
      title: 'Third',
      items: [
        { id: 'p-201', name: 'Running Shoes', columnId: '3' },
        { id: 'p-202', name: 'Coffee Grinder', columnId: '3' },
        { id: 'p-203', name: 'LED Desk Lamp', columnId: '3' },
      ],
    }]

  ngOnInit() { }

  dragStart(task: Task, fromColId: string) {
    this.draggedProduct = task;
    this.fromColId = fromColId;
  }

  drop(toColId: string) {
    if (!this.draggedProduct || !this.fromColId) return;

    const fromCol = this.columns.find(c => c.id === this.fromColId)!;
    const toCol = this.columns.find(c => c.id === toColId)!;

    if (fromCol.id === toCol.id) {
      return
    }

    const idx = fromCol.items.findIndex(i => i.id === this.draggedProduct!.id);
    if (idx > -1) fromCol.items.splice(idx, 1);
    toCol.items.push({ ...this.draggedProduct, columnId: toColId });

    // If using OnPush, reassign changed columns to trigger view updates:
    // this.columns = this.columns.map(c =>
    //   c.id === fromCol.id ? { ...c, items: [...fromCol.items] } :
    //   c.id === toCol.id   ? { ...c, items: [...toCol.items] }   : c
    // );

    this.draggedProduct = null;
    this.fromColId = null as any;
  }


  dragEnd() {
    this.fromColId = null as any;
    this.draggedProduct = null;
  }

}
