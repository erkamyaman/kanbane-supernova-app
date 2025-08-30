import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { ColumnsModule } from './columns/columns.module';
import { LabelsModule } from './labels/labels.module';

@Module({
  imports: [TasksModule, ColumnsModule, LabelsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
