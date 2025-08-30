import { Injectable } from '@nestjs/common';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Injectable()
export class ColumnsService {
  columns = [
    {
      id: '1',
      title: 'First',
      icon: 'pi-asterisk',
      iconColor: '#FF6F61'
    },
    {
      id: '2',
      title: 'Second',
      icon: 'pi-clock',
      iconColor: '#4D96FF'
    },
    {
      id: '3',
      title: 'Third',
      icon: 'pi-crown',
      iconColor: '#F5B700'
    }
  ];

  create(createColumnDto: CreateColumnDto) {
    const newColumn = {
      id: `${Math.floor(Math.random() * 10000)}`,
      title: createColumnDto.title,
      icon: createColumnDto.icon || 'pi-tag',
      iconColor: createColumnDto.iconColor || '#000000'
    };
    this.columns.push(newColumn);
    return this.columns;
  }

  findAll() {
    return this.columns;
  }

  findOne(id: string) {
    return this.columns.find(column => column.id === id);
  }

  update(id: string, updateColumnDto: UpdateColumnDto) {
    const idx = this.columns.findIndex((column) => column.id === id);
    if (idx > -1) {
      this.columns[idx] = { ...this.columns[idx], ...updateColumnDto };
      return { success: true, column: this.columns[idx] };
    }
    return { success: false, message: `Column with id ${id} not found` };
  }

  remove(id: string) {
    const idx = this.columns.findIndex((column) => column.id === id);

    if (idx !== -1) {
      const removed = this.columns.splice(idx, 1)[0];
      return { success: true, column: removed };
    }

    return { success: false, column: null };
  }
}
