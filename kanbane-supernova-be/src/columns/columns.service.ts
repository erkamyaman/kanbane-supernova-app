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
    return 'This action adds a new column';
  }

  findAll() {
    return this.columns;
  }

  findOne(id: number) {
    return `This action returns a #${id} column`;
  }

  update(id: number, updateColumnDto: UpdateColumnDto) {
    return `This action updates a #${id} column`;
  }

  remove(id: number) {
    return `This action removes a #${id} column`;
  }
}
