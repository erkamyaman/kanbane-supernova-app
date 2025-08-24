import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  tasks = [
    { id: 'p-001', name: 'Black Watch', columnId: '1' },
    { id: 'p-002', name: 'Bamboo Watch', columnId: '1' },
    { id: 'p-003', name: 'Blue T-Shirt', columnId: '1' },
    { id: 'p-101', name: 'Gaming Headset', columnId: '2' },
    { id: 'p-102', name: 'Office Chair', columnId: '2' },
    { id: 'p-103', name: 'USB-C Hub', columnId: '2' },
    { id: 'p-201', name: 'Running Shoes', columnId: '3' },
    { id: 'p-202', name: 'Coffee Grinder', columnId: '3' },
    { id: 'p-203', name: 'LED Desk Lamp', columnId: '3' }
  ];

  create(createTaskDto: CreateTaskDto) {
    const newTask = {
      id: `p-${Math.floor(Math.random() * 10000)}`,
      name: createTaskDto.name,
      definition: createTaskDto.definition,
      columnId: createTaskDto.columnId
    };

    this.tasks.push(newTask);
    return this.tasks;
  }

  findAll() {
    return this.tasks;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    console.log(updateTaskDto);
    const idx = this.tasks.findIndex((task) => task.id === id);
    if (idx > -1) {
      this.tasks[idx] = { ...this.tasks[idx], ...updateTaskDto };
      return { success: true, task: this.tasks[idx] };
    }
    return { success: false, message: `Task with id ${id} not found` };
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
