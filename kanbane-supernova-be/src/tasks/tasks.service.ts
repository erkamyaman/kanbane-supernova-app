import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  columns = [
    {
      id: '1',
      title: 'First',
      icon: 'pi-asterisk',
      iconColor: '#FF6F61',
      items: [
        { id: 'p-001', name: 'Black Watch', columnId: '1' },
        { id: 'p-002', name: 'Bamboo Watch', columnId: '1' },
        { id: 'p-003', name: 'Blue T-Shirt', columnId: '1' }
      ]
    },
    {
      id: '2',
      title: 'Second',
      icon: 'pi-clock',
      iconColor: '#4D96FF',
      items: [
        { id: 'p-101', name: 'Gaming Headset', columnId: '2' },
        { id: 'p-102', name: 'Office Chair', columnId: '2' },
        { id: 'p-103', name: 'USB-C Hub', columnId: '2' }
      ]
    },
    {
      id: '3',
      title: 'Third',
      icon: 'pi-crown',
      iconColor: '#F5B700',
      items: [
        { id: 'p-201', name: 'Running Shoes', columnId: '3' },
        { id: 'p-202', name: 'Coffee Grinder', columnId: '3' },
        { id: 'p-203', name: 'LED Desk Lamp', columnId: '3' }
      ]
    }
  ];

  create(createTaskDto: CreateTaskDto) {
    return 'This action adds a new task';
  }

  findAll() {
    return this.columns;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
