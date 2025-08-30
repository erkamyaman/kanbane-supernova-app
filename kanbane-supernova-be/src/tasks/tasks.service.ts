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
      links: ['https://angular.dev/guide/components']
    },
    {
      id: 'p-002',
      name: 'Angular Directives',
      columnId: '1',
      definition: 'Special markers in templates that add behavior to elements or modify DOM structure.',
      links: ['https://angular.dev/guide/directives']
    },
    {
      id: 'p-003',
      name: 'Angular Services & Dependency Injection',
      columnId: '1',
      definition: 'Reusable classes for business logic, injected where needed to keep components lean.',
      links: ['https://angular.dev/guide/dependency-injection']
    },
    {
      id: 'p-101',
      name: 'RxJS Observables',
      columnId: '2',
      definition: 'A way to handle asynchronous data streams, commonly used with Angular’s HttpClient.',
      links: ['https://rxjs.dev/guide/observable']
    },
    {
      id: 'p-102',
      name: 'Angular Routing',
      columnId: '2',
      definition: 'Defines navigation between views and passes data via route parameters.',
      links: ['https://angular.dev/guide/routing']
    },
    {
      id: 'p-103',
      name: 'Angular Forms (Template-driven & Reactive)',
      columnId: '2',
      definition: 'Two approaches to handle form inputs and validation in Angular.',
      links: ['https://angular.dev/guide/forms-overview']
    },
    {
      id: 'p-201',
      name: 'Angular Signals',
      columnId: '3',
      definition: 'A new reactive primitive in Angular for fine-grained reactivity.',
      links: ['https://angular.dev/guide/signals']
    },
    {
      id: 'p-202',
      name: 'Change Detection',
      columnId: '3',
      definition: 'Mechanism that ensures the UI updates when application state changes.',
      links: ['https://angular.dev/guide/change-detection']
    },
    {
      id: 'p-203',
      name: 'Angular Modules (NgModules)',
      columnId: '3',
      definition: 'Organizes components, directives, and services into cohesive blocks.',
      links: ['https://angular.dev/guide/ngmodules']
    }
  ];

  create(createTaskDto: CreateTaskDto) {
    const newTask = {
      id: `p-${Math.floor(Math.random() * 10000)}`,
      name: createTaskDto.name,
      definition: createTaskDto.definition,
      columnId: createTaskDto.columnId,
      links: [...createTaskDto.links]
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
