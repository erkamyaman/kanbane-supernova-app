import { Component } from '@angular/core';
import { DragDropModule } from 'primeng/dragdrop';

@Component({
  selector: 'app-kanban-body',
  imports: [DragDropModule],
  templateUrl: './kanban-body.html',
  styleUrl: './kanban-body.scss',
})
export class KanbanBody {
  first: any[] | undefined;

  second: any[] | undefined;

  third: any[] | undefined;

  chosenArray: any[] = [];
  newChosenArray: any[] = [];

  draggedProduct: any | undefined | null;

  ngOnInit() {
    this.first = [
      { id: '1', name: 'Black Watch', way: 'first' },
      { id: '2', name: 'Bamboo Watch', way: 'first' }
    ]
    this.second = [];
    this.third = []
  }

  dragStart(product: any, chosenArray: any) {
    this.draggedProduct = product;
    this.chosenArray = chosenArray;
  }

  drop(area: any, newChosenArray: any) {
    this.newChosenArray = newChosenArray;

    this.handleDrop(this.chosenArray, this.newChosenArray, area)
    this.newChosenArray = []
    this.chosenArray = []
    this.draggedProduct = null;
  }

  handleDrop(fromRef: any[], toRef: any[], newWay: string) {
    const p = this.draggedProduct;

    const idx = fromRef.findIndex(item => item.id === p.id);
    if (idx > -1) fromRef.splice(idx, 1);

    toRef.push({ ...p, way: newWay });

    this.draggedProduct = null;

  }

  dragEnd() {
    this.newChosenArray = []
    this.chosenArray = []
    this.draggedProduct = null;
  }

}
