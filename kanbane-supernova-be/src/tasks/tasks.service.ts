import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  tasks = [
    {
      id: 'p-001',
      name: 'Angular Components',
      columnId: '1',
      definition: 'The building blocks of Angular applications that control a part of the UI.',
      links: ['https://angular.dev/guide/components'],
      labels: [
        { id: 'l-001', name: 'Frontend', color: '#3B82F6' },
        { id: 'l-002', name: 'Angular', color: '#DD0031' },
        { id: 'l-003', name: 'Components', color: '#F59E0B' }
      ]
    },
    {
      id: 'p-002',
      name: 'Angular Directives',
      columnId: '1',
      definition: 'Special markers in templates that add behavior to elements or modify DOM structure.',
      links: ['https://angular.dev/guide/directives'],
      labels: [
        { id: 'l-001', name: 'Frontend', color: '#3B82F6' },
        { id: 'l-002', name: 'Angular', color: '#DD0031' },
        { id: 'l-004', name: 'Templates', color: '#8B5CF6' }
      ]
    },
    {
      id: 'p-003',
      name: 'Angular Services & Dependency Injection',
      columnId: '1',
      definition: 'Reusable classes for business logic, injected where needed to keep components lean.',
      links: ['https://angular.dev/guide/dependency-injection'],
      labels: [
        { id: 'l-005', name: 'Backend', color: '#10B981' },
        { id: 'l-002', name: 'Angular', color: '#DD0031' },
        { id: 'l-006', name: 'Architecture', color: '#6B7280' }
      ]
    },
    {
      id: 'p-101',
      name: 'RxJS Observables',
      columnId: '2',
      definition: "A way to handle asynchronous data streams, commonly used with Angular's HttpClient.",
      links: ['https://rxjs.dev/guide/observable'],
      labels: [
        { id: 'l-001', name: 'Frontend', color: '#3B82F6' },
        { id: 'l-007', name: 'RxJS', color: '#B7178C' },
        { id: 'l-008', name: 'Async', color: '#EC4899' }
      ]
    },
    {
      id: 'p-102',
      name: 'Angular Routing',
      columnId: '2',
      definition: 'Defines navigation between views and passes data via route parameters.',
      links: ['https://angular.dev/guide/routing'],
      labels: [
        { id: 'l-001', name: 'Frontend', color: '#3B82F6' },
        { id: 'l-002', name: 'Angular', color: '#DD0031' },
        { id: 'l-009', name: 'Navigation', color: '#06B6D4' }
      ]
    },
    {
      id: 'p-103',
      name: 'Angular Forms (Template-driven & Reactive)',
      columnId: '2',
      definition: 'Two approaches to handle form inputs and validation in Angular.',
      links: ['https://angular.dev/guide/forms-overview'],
      labels: [
        { id: 'l-001', name: 'Frontend', color: '#3B82F6' },
        { id: 'l-002', name: 'Angular', color: '#DD0031' },
        { id: 'l-010', name: 'Forms', color: '#84CC16' }
      ]
    },
    {
      id: 'p-201',
      name: 'Angular Signals',
      columnId: '3',
      definition: 'A new reactive primitive in Angular for fine-grained reactivity.',
      links: ['https://angular.dev/guide/signals'],
      labels: [
        { id: 'l-001', name: 'Frontend', color: '#3B82F6' },
        { id: 'l-002', name: 'Angular', color: '#DD0031' },
        { id: 'l-011', name: 'Advanced', color: '#F97316' }
      ]
    },
    {
      id: 'p-202',
      name: 'Change Detection',
      columnId: '3',
      definition: 'Mechanism that ensures the UI updates when application state changes.',
      links: ['https://angular.dev/guide/change-detection'],
      labels: [
        { id: 'l-001', name: 'Frontend', color: '#3B82F6' },
        { id: 'l-002', name: 'Angular', color: '#DD0031' },
        { id: 'l-012', name: 'Performance', color: '#EF4444' }
      ]
    },
    {
      id: 'p-203',
      name: 'Angular Modules (NgModules)',
      columnId: '3',
      definition: 'Organizes components, directives, and services into cohesive blocks.',
      links: ['https://angular.dev/guide/ngmodules'],
      labels: [
        { id: 'l-001', name: 'Frontend', color: '#3B82F6' },
        { id: 'l-002', name: 'Angular', color: '#DD0031' },
        { id: 'l-006', name: 'Architecture', color: '#6B7280' }
      ]
    }
  ];

  create(createTaskDto: CreateTaskDto) {
    const newTask = {
      id: `p-${Math.floor(Math.random() * 10000)}`,
      name: createTaskDto.name,
      definition: createTaskDto.definition,
      columnId: createTaskDto.columnId,
      links: [...createTaskDto.links],
      labels: createTaskDto.labels || []
    };
    console.log(createTaskDto);
    console.log(newTask);
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

  remove(id: string) {
    const idx = this.tasks.findIndex((task) => task.id === id);

    if (idx !== -1) {
      const removed = this.tasks.splice(idx, 1)[0]; // actually removes it
      return { success: true, task: removed };
    }

    return { success: false, task: null };
  }
}
