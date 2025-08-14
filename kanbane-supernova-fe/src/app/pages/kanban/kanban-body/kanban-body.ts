import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { DragDropModule } from 'primeng/dragdrop';

@Component({
  selector: 'app-kanban-body',
  imports: [DragDropModule, NgFor, NgIf],
  templateUrl: './kanban-body.html',
  styleUrl: './kanban-body.scss',
})
export class KanbanBody {

  availableProducts: any[] | undefined;

  selectedProducts: any[] | undefined;

  boughtProducts: any[] | undefined;


  draggedProduct: any | undefined | null;

  ngOnInit() {
    this.selectedProducts = [];
    this.availableProducts = [
      { id: '1', name: 'Black Watch', way: 'left' },
      { id: '2', name: 'Bamboo Watch', way: 'left' }
    ]
    this.boughtProducts = []
  }

  dragStart(product: any) {
    this.draggedProduct = product;
  }

  drop(area: any) {
    const p = this.draggedProduct;
    if (!p) return;

    const byId = (a: any, b: any) => (a?.id !== undefined && b?.id !== undefined) ? a.id !== b.id : a !== b;

    if (p.way === 'left') {
      this.availableProducts = (this.availableProducts ?? []).filter(item => byId(item, p));
      if (area === 'mid') {
        this.selectedProducts = [...(this.selectedProducts ?? []), { ...p, way: 'right' as const }];
      } else if (area === 'finish') {
        this.boughtProducts = [...(this.boughtProducts ?? []), { ...p, way: 'middle' as const }];
      }
    } else if (p.way === 'right') {
      this.selectedProducts = (this.selectedProducts ?? []).filter(item => byId(item, p));
      if (area === 'start') {
        this.availableProducts = [...(this.availableProducts ?? []), { ...p, way: 'left' as const }];
      } else {
        this.boughtProducts = [...(this.boughtProducts ?? []), { ...p, way: 'middle' as const }];
      }
    } else if (p.way === 'middle') {
      this.boughtProducts = (this.boughtProducts ?? []).filter(item => byId(item, p));
      if (area === 'start') {
        this.availableProducts = [...(this.availableProducts ?? []), { ...p, way: 'left' as const }];
      } else if (area === 'mid') {
        this.selectedProducts = [...(this.selectedProducts ?? []), { ...p, way: 'right' as const }];

      }
    }

    this.draggedProduct = null;
  }

  dragEnd() {
    this.draggedProduct = null;
  }

  findIndex(product: any) {
    let index = -1;
    for (let i = 0; i < (this.availableProducts as any[]).length; i++) {
      if (product.id === (this.availableProducts as any[])[i].id) {
        index = i;
        break;
      }
    }
    return index;
  }
}
